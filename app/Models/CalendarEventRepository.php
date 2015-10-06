<?php namespace App\Models;

use App\Models\CalendarEvent;
use Doctrine\ORM\EntityRepository;

class CalendarEventRepository extends EntityRepository
{
    public function findForUser($eventId, $userId)
    {
        $qb = $this->getEntityManager()->createQueryBuilder();
        $qb->select('c')
           ->from(CalendarEvent::class, 'c')
           ->where($qb->expr()->andX(
                $qb->expr()->eq('c.id', '?1'),
                $qb->expr()->eq('c.user', '?2')
            ))
           ->setParameter(1, $eventId)
           ->setParameter(2, $userId);

        return $qb->getQuery()->getOneOrNullResult();
    }
    
    public function getCalendarEventsBetween($userId, \DateTimeImmutable $startDate, \DateTimeImmutable $endDate)
    {
        $qb = $this->getEntityManager()->createQueryBuilder();
        $qb->select('c')
           ->addSelect(
               'LENGTH(c.plant.harvestTime) AS harvestTimeLength'
            )
           ->addSelect(
               'SUBSTRING(c.plant.harvestTime, 1, harvestTimeLength - 1) AS harvestMonths'
            )
           ->addSelect(
               'DATE_ADD(c.readyDate, harvestMonths, \'MONTH\') AS lastReadyDate'
            )
           ->from(CalendarEvent::class, 'c')
           ->where($qb->expr()->eq('c.user', '?1'))
           ->where($qb->expr()->andX(
                $qb->expr()->eq('c.user', '?1'),
                $qb->expr()->orX(
                    $qb->expr()->between('c.readyDate', '?2', '?3'),
                    $qb->expr()->between('lastReadyDate', '?2', '?3'),
                    $qb->expr()->between('?2', 'c.readyDate', 'lastReadyDate'),
                    $qb->expr()->between('c.plantedDate', '?2', '?3')
            )))
           ->orderBy('c.readyDate', 'ASC')
           ->setParameter(1, $userId)
           ->setParameter(2, $startDate)
           ->setParameter(3, $endDate);

        return array_map(
            function ($result) {
                return $result[0];
            },
            $qb->getQuery()->getResult());
    }
}
