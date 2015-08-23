<?php namespace App\Models;

use Doctrine\Common\Collections\ArrayCollection;

/**
 * @Entity(repositoryClass="PlantEventRepository")
 * @Table(
 *     name="PlantEvent",
 *     indexes={
 *         @Index(name="plantedDate_idx", columns={"plantedDate"}),
 *         @Index(name="readyDate_idx", columns={"readyDate"})
 *     })
 */
class PlantEvent
{
    /**
     * @Id
     * @GeneratedValue
     * @Column(type="integer")
     * @var int
     */
    private $id;

    /**
     * @Column(type="datetime")
     * @var DateTime
     */
    private $plantedMonth;

    /**
     * @Column(type="datetime")
     * @var DateTime
     */
    private $readyMonth;

    /**
     * @Column(type="boolean", options={"default"=false})
     * @var boolean
     */
    private $isDelayed;

    /**
     * @Column(type="boolean", options={"default"=false})
     * @var boolean
     */
    private $isDead;

    /**
     * @Column(type="string")
     * @var string
     */
    private $harvests;

    /**
     * @ManyToOne(targetEntity="Plant", fetch="EAGER")
     * @JoinColum(name="plant_id", referencedColumnName="id", onDelete="CASCADE")
     * @var App\Models\Plant
     */
    private $plant;

    /**
     * @ManyToOne(targetEntity="User")
     * @JoinColumn(name="user_id", referencedColumnName="id", onDelete="CASCADE")
     * @var App\Models\User
     */
    private $user;

    public function __construct($user, $plant, $plantedMonth)
    {
        $immutablePlantedMonth =
            \DateTimeImmutable::createFromMutable($plantedMonth);
        $growInterval = new \DateInterval($plant->getGrowTime());

        $this->user = $user;
        $this->plant = $plant;
        $this->plantedMonth = $plantedMonth;
        $this->readyMonth = $immutablePlantedMonth->add($growInterval);
        $this->harvests = '[]';
    }

    public function getId()
    {
        return $this->id;
    }

    public function getPlantedMonth()
    {
        return $this->plantedMonth;
    }

    public function getReadyMonth()
    {
        return $this->readyMonth;
    }

    public function setReadyMonth(\DateTime $readyMonth)
    {
        if ($this->isDead()) {
            throw new \LogicException('Cannot set the ready date of a dead plant');
        }

        $this->readyMonth = $readyMonth;
    }

    public function isDelayed()
    {
        return $this->isDelayed;
    }

    public function isDead()
    {
        return $this->isDead;
    }

    public function getHarvests()
    {
        return json_decode($this->harvests, true);
    }

    public function setHarvests(array $harvests)
    {
        $areAllValid = array_reduce(
            $harvests,
            function ($current, $item) {
                if ($current) {
                    $current = is_numeric($item) &&
                        ($item >= 0) &&
                        ($item < 1000);
                }

                return $current;
            },
            true);

        if (!$areAllValid) {
            throw new \InvalidArgumentException('harvests');
        }

        $this->harvests = json_encode($harvests);
    }

    public function delay()
    {
        if ($this->isDead()) {
            throw new \LogicException('Cannot delay a dead plant');
        }

        $this->isDelayed = true;
        $this->readyMonth->add(new \DateInterval('P1M'));
    }

    public function died()
    {
        $this->isDead = true;
    }

    public function user()
    {
        return $this->user;
    }

    public function plant()
    {
        return $this->plant;
    }
}
