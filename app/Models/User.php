<?php namespace App\Models;

use Doctrine\Common\Collections\ArrayCollection;

/**
 * @Entity
 */
class User
{
    /**
     * @Id
     * @GeneratedValue
     * @Column(type="integer")
     * @var int
     */
    private $id;

    /**
     * @OneToMany(targetEntity="App\Models\Claim", mappedBy="user")
     * @var App\Models\Claim[]
     */
    private $claims = null;

    /**
     * @Column(type="datetime")
     * @var DateTime
     */
    private $created;

    public function __construct()
    {
        $this->claims = new ArrayCollection();
        $this->created = new \DateTime("now");
    }

    public function getId()
    {
        return $this->id;
    }

    public function addClaim(Claim $claim)
    {
        $this->claims[] = $claim;
    }
}
