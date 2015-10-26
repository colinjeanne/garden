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
        // Doctrine does not support either type conversions or date interval
        // and so it is necessary to query for all events and filter them in
        // directly.
        $qb = $this->getEntityManager()->createQueryBuilder();
        $qb->select('c')
           ->from(CalendarEvent::class, 'c')
           ->where($qb->expr()->eq('c.user', '?1'))
           ->orderBy('c.readyDate', 'ASC')
           ->setParameter(1, $userId);
        
        return array_filter(
            $qb->getQuery()->getResult(),
            function ($calendarEvent) use ($startDate, $endDate) {
                $harvestTime = new \DateInterval(
                    $calendarEvent->plant()->getHarvestTime()
                );
                $readyDate = $calendarEvent->getReadyDate();
                $lastReadyDate = $readyDate->add($harvestTime);
                $plantedDate = $calendarEvent->getPlantedDate();
                
                return ($readyDate >= $startDate && $readyDate <= $endDate) ||
                    ($lastReadyDate >= $startDate && $lastReadyDate <= $endDate) ||
                    ($startDate >= $readyDate && $startDate <= $lastReadyDate) ||
                    ($plantedDate >= $startDate && $plantedDate <= $endDate);
            }
        );
    }
}
