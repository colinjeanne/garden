<?php namespace App\Models;

/**
 * @Entity(repositoryClass="App\Models\PlantRepository")
 */
class Plant
{
    /**
     * @Id
     * @Column(type="string", unique=true, length=100)
     * @var string
     */
    private $name;

    /**
     * @Column(type="string", length=30)
     * @var string
     *
     * An ISO 8601 duration specification. The grow time of a plant is the
     * amount of time between when the plant is first planted and when the
     * first harvest should be ready.
     */
    private $growTime;
    
    /**
     * @Column(type="string", length=30)
     * @var string
     *
     * An ISO 8601 duration specification. The harvest time of a plant is the
     * amount of time that the plant should have harvets.
     */
    private $harvestTime;

    /**
     * @Column(type="smallint", options={"unsigned":true, "default":1})
     * @var int
     */
    private $difficulty;

    /**
     * @Column(type="smallint", options={"unsigned":true, "default":1})
     * @var int
     */
    private $taste;

    /**
     * @Column(type="smallint", options={"unsigned":true, "default":1})
     * @var int
     */
    private $rarity;

    /**
     * @Column(type="float", options={"default":1.0})
     * @var float
     */
    private $pricePerUnit;

    /**
     * @Column(type="string", length=20)
     * @var string
     */
    private $unit = '';

    /**
     * @Column(type="float", options={"default":1.0})
     * @var float
     */
    private $unitPerSquareFoot;

    /**
     * @Column(type="string", length=65536)
     * @var string
     */
    private $notes = '';
    
    /**
     * @Column(type="string", length=50)
     * @var string
     */
    private $label = '';

    /**
     * @ManyToOne(targetEntity="App\Models\User")
     * @JoinColumn(name="user_id", referencedColumnName="id", onDelete="CASCADE")
     * @var App\Models\User
     */
    private $user;

    public function __construct($name, $user)
    {
        $this->name = $name;
        $this->user = $user;
    }

    public function getName()
    {
        return $this->name;
    }

    public function getGrowTime()
    {
        return $this->growTime;
    }

    public function setGrowTime($growTime)
    {
        self::validateDuration($growTime);
        
        $this->growTime = $growTime;
    }
    
    public function getHarvestTime()
    {
        return $this->harvestTime;
    }

    public function setHarvestTime($harvestTime)
    {
        self::validateDuration($harvestTime);
        
        $this->harvestTime = $harvestTime;
    }
    
    public function getDifficulty()
    {
        return $this->difficulty;
    }

    public function setDifficulty($difficulty)
    {
        if (!is_int($difficulty)) {
            throw new \InvalidArgumentException('difficulty');
        }

        if (!self::withinRange($difficulty, 1, 5)) {
            throw new \RangeException('difficulty');
        }

        $this->difficulty = $difficulty;
    }

    public function getTaste()
    {
        return $this->taste;
    }

    public function setTaste($taste)
    {
        if (!is_int($taste)) {
            throw new \InvalidArgumentException('taste');
        }

        if (!self::withinRange($taste, 1, 5)) {
            throw new \RangeException('taste');
        }

        $this->taste = $taste;
    }

    public function getRarity()
    {
        return $this->rarity;
    }

    public function setRarity($rarity)
    {
        if (!is_int($rarity)) {
            throw new \InvalidArgumentException('rarity');
        }

        if (!self::withinRange($rarity, 1, 3)) {
            throw new \RangeException('rarity');
        }

        $this->rarity = $rarity;
    }

    public function getPricePerUnit()
    {
        return $this->pricePerUnit;
    }

    public function setPricePerUnit($pricePerUnit)
    {
        if (!is_numeric($pricePerUnit)) {
            throw new \InvalidArgumentException('pricePerUnit');
        }

        if (!self::withinRange($pricePerUnit, 0.01, 400.00)) {
            throw new \RangeException('pricePerUnit');
        }

        $this->pricePerUnit = $pricePerUnit;
    }

    public function getUnit()
    {
        return $this->unit;
    }

    public function setUnit($unit)
    {
        if (!is_string($unit)) {
            throw new \InvalidArgumentException('unit');
        }

        if (strlen($unit) > 20) {
            throw new \UnexpectedValueException('unit');
        }
        
        $this->unit = $unit;
    }

    public function getUnitPerSquareFoot()
    {
        return $this->unitPerSquareFoot;
    }

    public function setUnitPerSquareFoot($unitPerSquareFoot)
    {
        if (!is_numeric($unitPerSquareFoot)) {
            throw new \InvalidArgumentException('unitPerSquareFoot');
        }

        if (!self::withinRange($unitPerSquareFoot, 0.001, 1000.00)) {
            throw new \RangeException('unitPerSquareFoot');
        }

        $this->unitPerSquareFoot = $unitPerSquareFoot;
    }

    public function getNotes()
    {
        return $this->notes;
    }

    public function setNotes($notes)
    {
        if (!is_string($notes)) {
            throw new \InvalidArgumentException('notes');
        }

        if (strlen($notes) > 65536) {
            throw new \UnexpectedValueException('notes');
        }

        $this->notes = $notes;
    }
    
    public function getLabel()
    {
        return $this->label;
    }

    public function setLabel($label)
    {
        if (!is_string($label)) {
            throw new \InvalidArgumentException('label');
        }

        if (strlen($label) > 50) {
            throw new \UnexpectedValueException('label');
        }

        $this->label = $label;
    }

    public function user()
    {
        return $this->user;
    }

    public function value()
    {
        return $this->getPricePerUnit() *
            $this->getUnitPerSquareFoot() *
            $this->getRarity() *
            $this->getTaste() /
            $this->getDifficulty();
    }
    
    private static function validateDuration($duration)
    {
        try {
            $testInterval = new \DateInterval($duration);
            if (($testInterval->y !== 0) ||
                ($testInterval->d !== 0) ||
                ($testInterval->h !== 0) ||
                ($testInterval->i !== 0) ||
                ($testInterval->s !== 0) ||
                ($testInterval->invert !== 0) ||
                ($testInterval->m === 0)) {
                throw new \InvalidArgumentException('duration');
            }
        } catch (Exception $e) {
            throw new \UnexpectedValueException('duration');
        }
    }

    private static function withinRange($value, $min, $max)
    {
        return ($min <= $value) && ($value <= $max);
    }
}
