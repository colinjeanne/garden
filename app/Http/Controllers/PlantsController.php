<?php namespace App\Http\Controllers;

use App\Auth\UserProvider;
use App\Http\Controllers\Controller;
use App\Models\Plant;
use App\Models\UserPlantData;
use Doctrine\Common\Persistence\ObjectManager as DB;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException as UniqueConstraintViolationException;
use Illuminate\Http\Request;
use Respect\Validation\Validator as v;

class PlantsController extends Controller
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
        $this->middleware('accept-json');
        $this->middleware('provide-json',
            ['only' => 'createPlant', 'updatePlant']);
    }

    public function getPlants()
    {
        $plants = $this->db->getRepository(Plant::class)
            ->findAllForUser($this->user->getId());

        $plantsJson = array_map(
            [self::class, 'plantToJson'],
            $plants);

        return response()->json($plantsJson);
    }

    public function createPlant(Request $request)
    {
        $json = $request->json()->all();

        $this->validatePlantJson($json);

        $plant = new Plant($json['name'], $this->user);
        $this->db->persist($plant);

        $this->updatePlantFromJson($plant, $json);

        try {
            $this->db->flush();
        } catch (UniqueConstraintViolationException $e) {
            abort(400);
        }

        return response()->json(self::plantToJson($plant), 201);
    }

    public function getPlant(Request $request, $name)
    {
        $plant = $this->db->getRepository(Plant::class)
            ->findForUser($name, $this->user->getId());
        if (!$plant) {
            abort(404);
        }

        return response()->json(self::plantToJson($plant));
    }

    public function updatePlant(Request $request, $name)
    {
        $json = $request->json()->all();

        $this->validatePlantJson($json);

        $plant = $this->db->getRepository(Plant::class)
            ->findForUser($name, $this->user->getId());
        if (!$plant) {
            abort(404);
        }

        $this->updatePlantFromJson($plant, $json);

        $this->db->flush();

        return response()->json(self::plantToJson($plant));
    }

    private function validatePlantJson($json)
    {
        $validator = v::arrType()->
            keySet(
                v::key('name', v::strType()->length(2, 100)),
                v::key('growTime', v::strType()->length(1, 5)),
                v::key('harvestTime', v::strType()->length(1, 5)),
                v::key('difficulty', v::intVal()->between(1, 5)),
                v::key('taste', v::intVal()->between(1, 5)),
                v::key('rarity', v::intVal()->between(1, 3)),
                v::key('pricePerUnit', v::numericVal()->min(0.01, true)),
                v::key('unit', v::strType()->length(null, 20), false),
                v::key('unitPerSquareFoot', v::numericVal()->min(0.001, true)),
                v::key('notes', v::strType()->length(null, 65536), false),
                v::key('label', v::strType()->length(null, 50), false),
                v::key('links', v::arrType()->key('self', v::url()), false),
                v::key('value', v::numericVal(), false)
            );
        
        $validator->check($json);
    }

    private function updatePlantFromJson(Plant $plant, array $json)
    {
        $plant->setGrowTime($json['growTime']);
        $plant->setHarvestTime($json['harvestTime']);
        $plant->setDifficulty($json['difficulty']);
        $plant->setTaste($json['taste']);
        $plant->setRarity($json['rarity']);
        $plant->setPricePerUnit($json['pricePerUnit']);
        
        if (array_key_exists('unit', $json)) {
            $plant->setUnit($json['unit']);
        }
        
        $plant->setUnitPerSquareFoot($json['unitPerSquareFoot']);
        
        if (array_key_exists('notes', $json)) {
            $plant->setNotes($json['notes']);
        }
        
        if (array_key_exists('label', $json)) {
            $plant->setLabel($json['label']);
        }
    }

    private static function plantToJson(Plant $plant)
    {
        return [
            'name'              => $plant->getName(),
            'growTime'          => $plant->getGrowTime(),
            'harvestTime'       => $plant->getHarvestTime(),
            'difficulty'        => $plant->getDifficulty(),
            'taste'             => $plant->getTaste(),
            'rarity'            => $plant->getRarity(),
            'pricePerUnit'      => $plant->getPricePerUnit(),
            'unit'              => $plant->getUnit(),
            'unitPerSquareFoot' => $plant->getUnitPerSquareFoot(),
            'notes'             => $plant->getNotes(),
            'label'             => $plant->getLabel(),
            'value'             => $plant->value(),

            'links'             => [
                'self'          => route('getPlant', ['name' => $plant->getName()]),
            ],
        ];
    }
}
