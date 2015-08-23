<?php namespace App\Models;

/**
 * @Entity(repositoryClass="ClaimRepository")
 */
class Claim
{
    /**
     * @Id
     * @Column(type="string")
     * @var string
     */
    private $claim;

    /**
     * @Column(type="datetime")
     * @var DateTime
     */
    private $created;

    /**
     * @ManyToOne(targetEntity="User", inversedBy="claims", fetch="EAGER")
     * @JoinColumn(name="user_id", referencedColumnName="id", onDelete="CASCADE")
     * @var App\Models\User
     */
    private $user;

    public function __construct($issuer, $subject)
    {
        $this->claim = $issuer . ModelConstants::CLAIM_SEPARATOR . $subject;
        $this->created = new \DateTime("now");
    }

    public function getClaim()
    {
        return $this->claim;
    }

    public function user()
    {
        return $this->user;
    }

    public function setUser(User $user)
    {
        $user->addClaim($this);
        $this->user = $user;
    }
}
