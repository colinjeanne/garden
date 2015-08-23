<?php namespace App\Http\Controllers;

use App\Auth\UserProvider;
use App\Http\Controllers\Controller;
use Doctrine\Common\Persistence\ObjectManager as DB;
use Illuminate\Http\Request;

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

    public function getCurrent()
    {
        // XXX Get from input as well
        $startDate = new \DateTime();
        $endDate = new \DateTime("today +30 day");

        $events = $this->db->getRepository('PlantEvent')
            ->getPlantsReadyBetween($this->user->getId(), $startDate, $endDate);

        abort(501);
    }

    public function createItem(Request $request)
    {
        $json = $request->json();

        $this->validateEventJson($json);

        abort(501);
    }

    public function getItem($eventId)
    {
        abort(501);
    }

    public function updateItem(Request $request, $eventId)
    {
        $json = $request->json();
        
        $this->validateEventJson($json);

        abort(501);
    }

    public function deleteItem(Request $request, $eventId)
    {
        abort(501);
    }

    private function validateEventJson($json)
    {
        $this->validate(
            $json,
            [
                'plantedMonth'  => 'required|date|date_format:Y-m|after:01 January 2010|before:31 December 2020',
                'readyMonth'    => 'required|date|date_format:Y-m|after:01 January 2010|before:31 December 2020',
                'isDelayed'     => 'required|boolean',
                'isDead'        => 'required|boolean',
                'harvests'      => 'required|array',
                'links'         => 'array',
            ]);

        foreach ($json['harvests'] as $key => $value) {
            if (!is_int($key)) {
                abort(400);
            }

            if (!is_numeric($value)) {
                abort(400);
            }

            if (($value <= 0) || ($value > 1000)) {
                abort(400);
            }
        }

        if (array_key_exists('links', $json)) {
            $this->validate(
                $json['links'],
                [
                    'self'  => 'url',
                    'plant' => 'url',
                ]);
        }
    }
}
