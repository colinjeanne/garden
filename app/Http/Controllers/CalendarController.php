<?php namespace App\Http\Controllers;

use App\Auth\UserProvider;
use App\Http\Controllers\Controller;
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

    public function getCurrent()
    {
        // XXX Get from input as well
        $startDate = new \DateTime();
        $endDate = new \DateTime("today +30 day");

        $events = $this->db->getRepository(PlantEvent::class)
            ->getPlantsReadyBetween($this->user->getId(), $startDate, $endDate);

        abort(501);
    }

    public function createItem(Request $request)
    {
        $json = $request->json()->all();

        $this->validateEventJson($json);

        abort(501);
    }

    public function getItem($eventId)
    {
        abort(501);
    }

    public function updateItem(Request $request, $eventId)
    {
        $json = $request->json()->all();
        
        $this->validateEventJson($json);

        abort(501);
    }

    public function deleteItem(Request $request, $eventId)
    {
        abort(501);
    }

    private function validateEventJson($json)
    {
        $validator = v::arrType()->
            keySet(
                v::key(
                    'plantedDate',
                    v::date('Y-m')->between('01 January 2010', '31 December 2020')),
                v::key(
                    'readyDate',
                    v::date('Y-m')->between('01 January 2010', '31 December 2020')),
                v::key('isDelayed', v::boolType()),
                v::key('isDead', v::boolType()),
                v::key(
                    'harvests',
                    v::arrType()->each(
                        v::numericVal()->between(0, 1000), // Value
                        v::intVal() // Key
                    )),
                v::key(
                    'links',
                    v::arrType()->ketSet(
                        key('self', v::url()),
                        key('plant', v::url())),
                    false)
            );
        
        $validator->check($json);
    }
}
