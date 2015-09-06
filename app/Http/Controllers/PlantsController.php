<?php namespace App\Http\Controllers;

use App\Auth\UserProvider;
use App\Http\Controllers\Controller;
use App\Models\Plant;
use App\Models\UserPlantData;
use Doctrine\Common\Persistence\ObjectManager as DB;
use Illuminate\Http\Request;

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
        $this->middleware('provide-json', ['only' => 'updateUserPlantData']);
    }

    public function getPlants()
    {
        $plants = $this->db->getRepository(Plant::class)
            ->findAllForUser($this->user->getId());

        $plantsJson = array_map(
            [PlantsController::class, 'plantToJson'],
            $plants);

        return response()->json($plantsJson);
    }

    public function createPlant(Request $request)
    {
        $json = $request->json();
        
        $this->validatePlantJson($json);

        $plant = new Plant($json['name'], $this->user);
        $this->db->persist($plant);

        $this->updatePlantFromJson($plant, $json);

        $this->db->flush();

        return response()->json(self::plantToJson($plant));
    }

    public function getPlant($plantId)
    {
        $plant = $this->db->getRepository(Plant::class)
            ->findForUser($plantId, $this->user->getId());

        return response()->json(self::plantToJson($plant));
    }

    public function updatePlant(Request $request, $plantId)
    {
        $json = $request->json();

        $this->validatePlantJson($json);

        $plant = $this->db->getRepository(Plant::class)
            ->findForUser($plantId, $this->user->getId());
        if (!$plant) {
            abort(404);
        }

        $this->updatePlantFromJson($plant, $json);

        $this->db->flush();

        return response()->json(self::plantToJson($plant));
    }

    private static function validatePlantJson($json)
    {
        $this->validate(
            $json,
            [
                'name'              => 'required|string|between:2,100',
                'growTime'          => 'required|string|between:1,5',
                'difficulty'        => 'required|integer|between:1,5',
                'taste'             => 'required|integer|between:1,5',
                'rarity'            => 'required|integer|between:1,3',
                'pricePerUnit'      => 'required|numeric|min:0.01',
                'unit'              => 'required|string|between:1,20',
                'unitPerSquareFoot' => 'required|numeric|min:0.001',
                'notes'             => 'required|string|max:65536',
                'label'             => 'required|string|max:50',
                'links'             => 'array'
            ]);

        if (array_key_exists('links', $json)) {
            $this->validate(
                $json['links'],
                [
                    'self'          => 'url',
                ]);
        }
    }

    private function updatePlantFromJson(Plant $plant, array $json)
    {
        $plant->setGrowTime($json['growTime']);
        $plant->setDifficulty($json['difficulty']);
        $plant->setTaste($json['taste']);
        $plant->setRarity($json['rarity']);
        $plant->setPricePerUnit($json['pricePerUnit']);
        $plant->setUnit($json['unit']);
        $plant->setUnitPerSquareFoot($json['unitPerSquareFoot']);
        $plant->setNotes($json['notes']);
        $plant->setLabel($json['label']);
    }

    private static function plantToJson(Plant $plant)
    {
        return [
            'name'              => $plant->getName(),
            'growTime'          => $plant->getGrowTime(),
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
                'self'          => route('getPlant', $plant->getId()),
            ],
        ];
    }
}
