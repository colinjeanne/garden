<?php namespace App\Http\Controllers;

use App\Auth\UserProvider;
use App\Http\Controllers\Controller;
use App\Models\CalendarEvent;
use App\Models\Plant;
use Doctrine\Common\Persistence\ObjectManager as DB;
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
        $this->middleware('provide-json', ['except' => 'getCurrent', 'getItem']);
    }

    public function getCurrent(Request $request)
    {
        $hasReadyStartDate = $request->has('readyStartDate');
        $hasReadyEndDate = $request->has('readyEndDate');
        
        if ($hasReadyStartDate !== $hasReadyEndDate) {
            abort(400);
        }
        
        if ($hasReadyStartDate) {
            $startDate = new \DateTimeImmutable($request->input('readyStartDate'));
            $endDate = new \DateTimeImmutable($request->input('readyEndDate'));
        } else {
            $startDate = new \DateTimeImmutable();
            $endDate = new \DateTimeImmutable("today +30 day");
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

        $this->validateEventJson($json);
        
        $plant = $this->db->getRepository(Plant::class)
            ->findForUser($json['plantName'], $this->user->getId());
        if (!$plant) {
            abort(400);
        }
        
        try {
            $plantedDate = \DateTimeImmutable::createFromFormat(
                \DateTime::ISO8601,
                $plant);
        } catch (Exception $e) {
            abort(400);
        }
        
        $calendarEvent = new CalendarEvent(
            $json['id'],
            $this->user,
            $json['plantName'],
            $plantedDate);
        
        $this->db->persist($calendarEvent);
        
        $this->db->flush();

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
        
        $this->validateEventJson($json);
        
        $calendarEvent = $this->db->getRepository(CalendarEvent::class)
            ->findForUser($eventId, $this->user->getId());
        if (!$calendarEvent) {
            abort(404);
        }
        
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

    private function validateEventJson($json)
    {
        $validator = v::arrType()->
            keySet(
                v::key('id', v::strType()->length(5, 10)),
                v::key('plantName', v::strType()->length(2, 100)),
                v::key(
                    'plantedDate',
                    v::date('Y-m')->between('01 January 2010', '31 December 2020')),
                v::key(
                    'readyDate',
                    v::date('Y-m')->between('01 January 2010', '31 December 2020')),
                v::key('isDead', v::boolType()),
                v::key(
                    'harvests',
                    v::arrType()->each(
                        v::numericVal()->between(0, 1000), // Value
                        v::intVal() // Key
                    )),
                v::key(
                    'links',
                    v::arrType()->keySet(
                        v::key('self', v::url()),
                        v::key('plant', v::url())),
                    false)
            );
        
        $validator->check($json);
    }
    
    private function updateCalendarEventFromJson(CalendarEvent $calendarEvent, array $json)
    {
        $calendarEvent->setReadyDate($json['readyDate']);
        
        if (array_key_exists('harvests', $json)) {
            $calendarEvent->setHarvests($json['harvests']);
        }
        
        if (array_key_exists('isDead', $json) && $json['isDead']) {
            $calendarEvent->died();
        }
    }
    
    private static function calendarEventToJson(CalendarEvent $calendarEvent)
    {
        return [
            'id'            => $calendarEvent->getId(),
            'plantName'     => $calendarEvent->plant()->getName(),
            'plantedDate'   => $calendarEvent->getPlantedDate()->format(\DateTime::ISO8601),
            'readyDate'     => $calendarEvent->getReadyDate()->format(\DateTime::ISO8601),
            'isDead'        => $calendarEvent->isDead(),
            'harvests'      => $calendarEvent->getHarvests(),
            
            'links'         => [
                'self'      => route('getCalendarItem', ['eventId' => $calendarEvent->getId()]),
                'plant'     => route('getPlant', ['name' => $calendarEvent->plant()->getName()])
            ],
        ];
    }
}
