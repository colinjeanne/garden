<?php namespace App\Http\Controllers;

use App\Auth\UserProvider;
use App\Http\Controllers\Controller;
use App\Models\CalendarEvent;
use App\Models\Plant;
use Doctrine\Common\Persistence\ObjectManager as DB;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException as UniqueConstraintViolationException;
use Illuminate\Http\Request;
use Respect\Validation\Validator as v;

class CalendarController extends Controller
{
    /**
     * The current user
     * @var App\Models\User
     */
    private $user;

    /**
     * The database
     * @var Doctrine\Common\Persistence\ObjectManager
     */
    private $db;

    public function __construct(UserProvider $userProvider, DB $db)
    {
        $this->user = $userProvider->getCurrentUser();
        $this->db = $db;

        $this->middleware('auth');
        $this->middleware('accept-json', ['except' => 'deleteItem']);
        $this->middleware('provide-json',
            ['except' => ['getCurrent', 'getItem', 'deleteItem']]);
    }

    public function getCurrent(Request $request)
    {
        $hasReadyStartDate = $request->has('startDate');
        $hasReadyEndDate = $request->has('endDate');
        
        if ($hasReadyStartDate !== $hasReadyEndDate) {
            abort(400);
        }
        
        if ($hasReadyStartDate) {
            $startDate = null;
            if (!self::tryParseDateTimeFromTimestamp(
                $request->input('startDate'),
                $startDate)) {
                abort(400);
            }
            
            $endDate = null;
            if (!self::tryParseDateTimeFromTimestamp(
                $request->input('endDate'),
                $endDate)) {
                abort(400);
            }
        } else {
            $firstOfTheMonthTimestamp = mktime(0, 0, 0, date('n'), 1);
            $firstOfTheMonth = new \DateTime();
            $firstOfTheMonth->setTimestamp($firstOfTheMonthTimestamp);
            $startDate = \DateTimeImmutable::createFromMutable($firstOfTheMonth);
            $endDate = $startDate->add(new \DateInterval('P1M'));
        }

        $events = $this->db->getRepository(CalendarEvent::class)
            ->getCalendarEventsBetween(
                $this->user->getId(),
                $startDate,
                $endDate);
        
        $eventsJson = array_map(
            [self::class, 'calendarEventToJson'],
            $events);

        return response()->json($eventsJson);
    }

    public function createItem(Request $request)
    {
        $json = $request->json()->all();

        $this->validateEventJsonForCreate($json);
        
        $plant = $this->db->getRepository(Plant::class)
            ->findForUser($json['plantName'], $this->user->getId());
        if (!$plant) {
            abort(400);
        }
        
        if (!self::tryParseDateTime($json['plantedDate'], $plantedDate)) {
            abort(400);
        }
        
        $calendarEvent = new CalendarEvent(
            $this->user,
            $plant,
            $plantedDate);
        
        $this->createCalendarEventFromJson($calendarEvent, $json);
        
        $this->db->persist($calendarEvent);
        
        try {
            $this->db->flush();
        } catch (UniqueConstraintViolationException $e) {
            abort(400);
        }

        return response()->json(self::calendarEventToJson($calendarEvent), 201);
    }

    public function getItem($eventId)
    {
        $calendarEvent = $this->db->getRepository(CalendarEvent::class)
            ->findForUser($eventId, $this->user->getId());
        if (!$calendarEvent) {
            abort(404);
        }
        
        return response()->json(self::calendarEventToJson($calendarEvent));
    }

    public function updateItem(Request $request, $eventId)
    {
        $json = $request->json()->all();
        
        $calendarEvent = $this->db->getRepository(CalendarEvent::class)
            ->findForUser($eventId, $this->user->getId());
        if (!$calendarEvent) {
            abort(404);
        }
        
        $this->validateEventJsonForUpdate($calendarEvent, $json);
        $this->updateCalendarEventFromJson($calendarEvent, $json);
        
        $this->db->flush();

        return response()->json(self::calendarEventToJson($calendarEvent));
    }

    public function deleteItem(Request $request, $eventId)
    {
        $calendarEvent = $this->db->getRepository(CalendarEvent::class)
            ->findForUser($eventId, $this->user->getId());
        if (!$calendarEvent) {
            abort(404);
        }
        
        $this->db->remove($calendarEvent);
        $this->db->flush();
        
        return response('', 204);
    }
    
    private function validateEventJsonForCreate(array $json)
    {
        $validator = v::arrType()->
            keySet(
                v::key('plantName', v::strType()->length(2, 100)),
                v::key(
                    'plantedDate',
                    v::date(\DateTime::ATOM)
                        ->between('01 January 2010', '31 December 2020')),
                v::key(
                    'readyDate',
                    v::date(\DateTime::ATOM)
                        ->between('01 January 2010', '31 December 2020'),
                    false),
                v::key('isDead', v::boolType(), false),
                v::key(
                    'harvests',
                    v::arrType()->each(
                        v::numericVal()->between(0, 1000), // Value
                        v::intVal() // Key
                    ),
                    false)
            );
        
        $validator->check($json);
    }

    private function validateEventJsonForUpdate(CalendarEvent $calendarEvent, $json)
    {
        $validator = v::arrType()->
            keySet(
                v::key('plantName',
                    v::equals($calendarEvent->plant()->getName(), true)),
                v::key(
                    'plantedDate',
                    v::equals(
                        $calendarEvent->getPlantedDate()->format(\DateTime::ATOM),
                        true)),
                v::key(
                    'readyDate',
                    v::date(\DateTime::ATOM)
                        ->between('01 January 2010', '31 December 2020')),
                v::key('isDead', v::boolType(), false),
                v::key(
                    'harvests',
                    v::arrType()->each(
                        v::numericVal()->between(0, 1000), // Value
                        v::intVal() // Key
                    ),
                    false),
                v::key(
                    'links',
                    v::arrType()->keySet(
                        v::key('self', v::url()),
                        v::key('plant', v::url())),
                    false)
            );
        
        $validator->check($json);
    }
    
    private function createCalendarEventFromJson(CalendarEvent $calendarEvent, array $json)
    {
        if (array_key_exists('readyDate', $json)) {
            $readyDate = null;
            if (!self::tryParseDateTime($json['readyDate'], $readyDate) ||
                ($readyDate < $calendarEvent->getPlantedDate())) {
                abort(400);
            }
            
            $calendarEvent->setReadyDate($readyDate);
        }
        
        if (array_key_exists('harvests', $json)) {
            $calendarEvent->setHarvests($json['harvests']);
        }
        
        if (array_key_exists('isDead', $json) && $json['isDead']) {
            $calendarEvent->died();
        }
    }
    
    private function updateCalendarEventFromJson(CalendarEvent $calendarEvent, array $json)
    {
        $readyDate = null;
        if (!self::tryParseDateTime($json['readyDate'], $readyDate) ||
            ($readyDate < $calendarEvent->getPlantedDate())) {
            abort(400);
        }
        
        $readyDateChanged = $readyDate !== $calendarEvent->getReadyDate();
        
        $isDead = array_key_exists('isDead', $json) ?
            $json['isDead'] :
            false;
            
        $isDeadChanged = $isDead !== $calendarEvent->isDead();
        
        if ($calendarEvent->isDead() && !$isDead) {
            // It is not possible to bring a dead plant back
            abort(400);
        }
        
        if ($readyDateChanged && $isDeadChanged) {
            // Set the ready date first since it cannot be changed one the
            // plant is marked as dead
            $calendarEvent->setReadyDate($readyDate);
            $calendarEvent->died();
        } else if ($readyDateChanged) {
            $calendarEvent->setReadyDate($readyDate);
        } else if ($isDeadChanged) {
            $calendarEvent->died();
        }
        
        if (array_key_exists('harvests', $json)) {
            $calendarEvent->setHarvests($json['harvests']);
        } else {
            $calendarEvent->setHarvests([]);
        }
    }
    
    private static function calendarEventToJson(CalendarEvent $calendarEvent)
    {
        return [
            'id'            => $calendarEvent->getId(),
            'plantName'     => $calendarEvent->plant()->getName(),
            'plantedDate'   => $calendarEvent->getPlantedDate()->format(\DateTime::ATOM),
            'readyDate'     => $calendarEvent->getReadyDate()->format(\DateTime::ATOM),
            'isDead'        => $calendarEvent->isDead(),
            'harvests'      => $calendarEvent->getHarvests(),
            
            'links'         => [
                'self'      => route('getCalendarItem', ['eventId' => $calendarEvent->getId()]),
                'plant'     => route('getPlant', ['name' => $calendarEvent->plant()->getName()])
            ],
        ];
    }
    
    private static function tryParseDateTime($mixed, &$dateTime) {
        try {
            $dateTime = \DateTimeImmutable::createFromFormat(
                \DateTime::ATOM,
                $mixed);
        } catch (\Exception $e) {
            return false;
        }
        
        return true;
    }
    
    private static function tryParseDateTimeFromTimestamp($mixed, &$dateTime) {
        try {
            $dateTime = \DateTimeImmutable::createFromFormat(
                'U',
                $mixed);
        } catch (\Exception $e) {
            return false;
        }
        
        return true;
    }
}
