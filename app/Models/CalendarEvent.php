<?php namespace App\Models;

use App\Models\Plant;
use App\Models\User;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * @Entity(repositoryClass="App\Models\CalendarEventRepository")
 * @Table(
 *     name="CalendarEvent",
 *     indexes={
 *         @Index(name="plantedDate_idx", columns={"plantedDate"}),
 *         @Index(name="readyDate_idx", columns={"readyDate"})
 *     })
 */
class CalendarEvent
{
    /**
     * @Id
     * @Column(type="integer")
     * @GeneratedValue
     * @var int
     */
    private $id = null;

    /**
     * @Column(type="datetimetz")
     * @var DateTime
     */
    private $plantedDate;

    /**
     * @Column(type="datetimetz")
     * @var DateTime
     */
    private $readyDate;

    /**
     * @Column(type="boolean", options={"default":false})
     * @var boolean
     */
    private $isDead = false;

    /**
     * @Column(type="array")
     * @var array
     */
    private $harvests = [];

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

    public function __construct(User $user, Plant $plant, \DateTimeImmutable $plantedDate)
    {
        $growInterval = new \DateInterval($plant->getGrowTime());

        $this->user = $user;
        $this->plant = $plant;
        $this->plantedDate = $plantedDate;
        $this->readyDate = $plantedDate->add($growInterval);
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

    public function setReadyDate(\DateTimeImmutable $readyDate)
    {
        if ($this->isDead()) {
            throw new \LogicException('Cannot set the ready date of a dead plant');
        }

        $this->readyDate = $readyDate;
    }

    public function isDelayed()
    {
        $growInterval = new \DateInterval($this->plant()->getGrowTime());
        $expectedReadyDate = $this->getPlantedDate()->add($growInterval);
        
        return $this->getReadyDate() < $expectedReadyDate;
    }

    public function isDead()
    {
        return $this->isDead;
    }

    public function getHarvests()
    {
        return $this->harvests;
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

        $this->harvests = $harvests;
    }

    public function delay()
    {
        if ($this->isDead()) {
            throw new \LogicException('Cannot delay a dead plant');
        }

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
