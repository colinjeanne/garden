<?php namespace App\Models;

use App\Models\Plant;
use Doctrine\ORM\EntityRepository;

class PlantRepository extends EntityRepository
{
    public function findAllForUser($userId)
    {
        $qb = $this->getEntityManager()->createQueryBuilder();
        $qb->select('p')
           ->from(Plant::class, 'p')
           ->where($qb->expr()->eq('p.user', '?1'))
           ->setParameter(1, $userId);

        return $qb->getQuery()->getResult();
    }

    public function findForUser($name, $userId)
    {
        $qb = $this->getEntityManager()->createQueryBuilder();
        $qb->select('p')
           ->from(Plant::class, 'p')
           ->where($qb->expr()->andX(
               $qb->expr()->eq('p.name', '?1'),
               $qb->expr()->eq('p.user', '?2')
           ))
           ->setParameter(1, $name)
           ->setParameter(2, $userId);

        return $qb->getQuery()->getOneOrNullResult();
    }
}
