<?php namespace App\Models;

use App\Models\PlantEvent;
use Doctrine\ORM\EntityRepository;

class PlantEventRepository extends EntityRepository
{
    public function getPlantsReadyBetween($userId, \DateTime $startDate, \DateTime $endDate)
    {
        $qb = $this->getEntityManager()->createQueryBuilder();
        $qb->select('p')
           ->from(PlantEvent::class, 'p')
           ->where($qb->expr()->andX(
                $qb->expr()->eq('p.user', '?1'),
                $qb->expr()->between('p.readyDate', '?2', '?3')
            ))
           ->orderBy('p.readyDate', 'ASC')
           ->setParameter(1, $userId)
           ->setParameter(2, $startDate)
           ->setParameter(3, $endDate);

        return $qb->getQuery()->getResult();
    }

    public function getPlantsPlantedBetween($userId, \DateTime $startDate, \DateTime $endDate)
    {
        $qb = $this->getEntityManager()->createQueryBuilder();
        $qb->select('p')
           ->from(PlantEvent::class, 'p')
           ->where($qb->expr()->andX(
                $qb->expr()->eq('p.user', '?1'),
                $qb->expr()->between('p.plantedDate', '?2', '?3')
            ))
           ->orderBy('p.plantedDate', 'ASC')
           ->setParameter(1, $userId)
           ->setParameter(2, $startDate)
           ->setParameter(3, $endDate);

        return $qb->getQuery()->getResult();
    }
}
