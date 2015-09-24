<?php namespace App\Models;

use Doctrine\Common\Collections\ArrayCollection;

/**
 * @Entity(repositoryClass="App\Models\PlantEventRepository")
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
     * @Column(type="string")
     * @var string
     */
    private $id;

    /**
     * @Column(type="datetime")
     * @var DateTime
     */
    private $plantedDate;

    /**
     * @Column(type="datetime")
     * @var DateTime
     */
    private $readyDate;

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
     * @ManyToOne(targetEntity="App\Models\Plant", fetch="EAGER")
     * @JoinColumn(name="plant_name", referencedColumnName="name", onDelete="CASCADE")
     * @var App\Models\Plant
     */
    private $plant;

    /**
     * @ManyToOne(targetEntity="App\Models\User")
     * @JoinColumn(name="user_id", referencedColumnName="id", onDelete="CASCADE")
     * @var App\Models\User
     */
    private $user;

    public function __construct($id, $user, $plant, $plantedDate)
    {
        $immutablePlantedDate =
            \DateTimeImmutable::createFromMutable($plantedDate);
        $growInterval = new \DateInterval($plant->getGrowTime());

        $this->id = $id;
        $this->user = $user;
        $this->plant = $plant;
        $this->plantedDate = $plantedDate;
        $this->readyDate = $immutablePlantedDate->add($growInterval);
        $this->harvests = '[]';
    }

    public function getId()
    {
        return $this->id;
    }

    public function getPlantedDate()
    {
        return $this->plantedDate;
    }

    public function getReadyDate()
    {
        return $this->readyDate;
    }

    public function setReadyDate(\DateTime $readyDate)
    {
        if ($this->isDead()) {
            throw new \LogicException('Cannot set the ready date of a dead plant');
        }

        $this->readyDate = $readyDate;
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
