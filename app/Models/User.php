<?php namespace App\Models;

use Doctrine\Common\Collections\ArrayCollection;

/**
 * @Entity
 * @Table(name="Users")
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
     * The Unix timestamp when this user was created
     *
     * @Column(type="integer")
     * @var int
     */
    private $created;

    public function __construct()
    {
        $this->claims = new ArrayCollection();
        
        $now = new \DateTime("now");
        $this->created = $now->getTimestamp();
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
