<?php namespace App\Models;

use App\Models\CalendarEvent;
use Doctrine\ORM\EntityRepository;

class CalendarEventRepository extends EntityRepository
{
    public function getPlantsReadyBetween($userId, \DateTimeImmutable $startDate, \DateTimeImmutable $endDate)
    {
        $qb = $this->getEntityManager()->createQueryBuilder();
        $qb->select('p')
           ->addSelect(
               'LENGTH(p.plant.harvestTime) AS harvestTimeLength'
            )
           ->addSelect(
               'SUBSTRING(p.plant.harvestTime, 1, harvestTimeLength - 1) AS harvestMonths'
            )
           ->addSelect(
               'DATE_ADD(p.readyDate, harvestMonths, \'MONTH\') AS lastReadyDate'
            )
           ->from(CalendarEvent::class, 'p')
           ->where($qb->expr()->eq('p.user', '?1'))
           ->where($qb->expr()->andX(
                $qb->expr()->eq('p.user', '?1'),
                $qb->expr()->orX(
                    $qb->expr()->between('p.readyDate', '?2', '?3'),
                    $qb->expr()->between('lastReadyDate', '?2', '?3'),
                    $qb->expr()->between('?2', 'p.readyDate', 'lastReadyDate')
            )))
           ->orderBy('p.readyDate', 'ASC')
           ->setParameter(1, $userId)
           ->setParameter(2, $startDate)
           ->setParameter(3, $endDate);

        return array_map(
            function ($result) {
                return $result[0];
            },
            $qb->getQuery()->getResult());
    }

    public function getPlantsPlantedBetween($userId, \DateTimeImmutable $startDate, \DateTimeImmutable $endDate)
    {
        $qb = $this->getEntityManager()->createQueryBuilder();
        $qb->select('p')
           ->from(CalendarEvent::class, 'p')
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
