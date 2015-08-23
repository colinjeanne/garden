<?php namespace App\Models;

use Doctrine\ORM\EntityRepository;

class PlantRepository extends EntityRepository
{
    public function findAllForUser($userId)
    {
        $qb = $this->getEntityManager()->createQueryBuilder();
        $qb->select('p')
           ->from('Plant', 'p')
           ->where($qb->eq('p.user_id', '?1'))
           ->setParameter(1, $userId);

        return $qb->getQuery()->getResult();
    }

    public function findForUser($plantId, $userId)
    {
        $qb = $this->getEntityManager()->createQueryBuilder();
        $qb->select('p')
           ->from('Plant', 'p')
           ->where($qb->expr()->andX(
                $qb->eq('p.id', '?1'),
                $qb->eq('p.user_id', '?2')
            ))
           ->setParameter(1, $plantId)
           ->setParameter(2, $userId);

        return $qb->getQuery()->getResult();
    }
}
