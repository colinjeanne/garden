<?php

class CalendarEventTest extends TestCase
{
    public function testGetCurrentEvents()
    {
        $this->get(
            '/calendar',
            $this->getAuthorizationHeader() +
            $this->getAcceptJSONHeader())
            ->assertResponseOk();
        
        $this->seeJsonEquals([]);
        
        $this->createPlant('plant', 'P2M', 'P3M');
        
        $lastMonth = new \DateTime('now -2 months');
        $now = new \DateTime('now');
        $nextMonth = new \DateTime('next month');
        
        $event1 = [
            'plantName' => 'plant',
            'plantedDate' => $lastMonth->format(\DateTime::ATOM)
        ];
        
        $this->createEvent($event1);
        
        $event2 = [
            'plantName' => 'plant',
            'plantedDate' => $now->format(\DateTime::ATOM),
        ];
        
        $this->createEvent($event2);
        
        $event3 = [
            'plantName' => 'plant',
            'plantedDate' => $nextMonth->format(\DateTime::ATOM),
        ];
        
        $this->createEvent($event3);
        
        $this->get(
            '/calendar',
            $this->getAuthorizationHeader() +
            $this->getAcceptJSONHeader())
            ->assertResponseOk();
        
        $json = json_decode($this->response->content());
        $this->assertCount(2, $json);
        $this->seeJson($event1);
        $this->seeJson($event2);
    }
    
    public function testGetEventsBetweenDates() {
        $startDate = new \DateTimeImmutable('today');
        $endDate = $startDate->add(new \DateInterval('P3M'));
        
        $this->get(
            '/calendar?startDate=' . $startDate->getTimestamp() .
                '&endDate=' . $endDate->getTimestamp(),
            $this->getAuthorizationHeader() +
            $this->getAcceptJSONHeader())
            ->assertResponseOk();
        
        $this->seeJsonEquals([]);
        
        $this->createPlant('plant', 'P1M', 'P3M');
        
        $plantedDateBetween = [
            'plantName' => 'plant',
            'plantedDate' => $startDate->format(\DateTime::ATOM)
        ];
        
        $this->createEvent($plantedDateBetween);
        
        $plantedDateOutside = [
            'plantName' => 'plant',
            'plantedDate' => $endDate->
                add(new \DateInterval('P1M'))->
                format(\DateTime::ATOM)
        ];
        
        $this->createEvent($plantedDateOutside);
        
        $readyDateBetween = [
            'plantName' => 'plant',
            'plantedDate' => $startDate->
                sub(new \DateInterval('P1M'))->
                format(\DateTime::ATOM)
        ];
        
        $this->createEvent($readyDateBetween);
        
        $harvestBetween = [
            'plantName' => 'plant',
            'plantedDate' => $startDate->
                sub(new \DateInterval('P3M'))->
                format(\DateTime::ATOM)
        ];
        
        $this->createEvent($harvestBetween);
        
        $this->get(
            '/calendar?startDate=' . $startDate->getTimestamp() .
                '&endDate=' . $endDate->getTimestamp(),
            $this->getAuthorizationHeader() +
            $this->getAcceptJSONHeader())
            ->assertResponseOk();
        
        $json = json_decode($this->response->content());
        $this->assertCount(3, $json);
        $this->seeJson($plantedDateBetween);
        $this->seeJson($readyDateBetween);
        $this->seeJson($harvestBetween);
    }
    
    public function testCreateEvent()
    {
        $this->createPlant('plant', 'P2M', 'P3M');
        
        $now = new \DateTime();
        
        $event = [
            'plantName' => 'plant',
            'plantedDate' => $now->format(\DateTime::ATOM)
        ];
        
        $growTime = new \DateInterval('P2M');
        $nextMonth = new \DateTime();
        $nextMonth->add($growTime);
        
        $expectedJson = [
            'plantName' => 'plant',
            'plantedDate' => $now->format(\DateTime::ATOM),
            'readyDate' => $nextMonth->format(\DateTime::ATOM),
            'isDead' => false,
            'harvests' => []
        ];
        
        $this->createEvent($event);
        $this->assertResponseStatus(201);
        $this->seeJson($expectedJson);
    }
    
    public function testCreateEventWithOptionalFields()
    {
        $this->createPlant('plant', 'P2M', 'P3M');
        
        $now = new \DateTime();
        $nextMonth = new \DateTime('next month');
        
        $event = [
            'plantName' => 'plant',
            'plantedDate' => $now->format(\DateTime::ATOM),
            'readyDate' => $nextMonth->format(\DateTime::ATOM),
            'isDead' => false,
            'harvests' => [1, 50]
        ];
        
        $this->createEvent($event);
        $this->assertResponseStatus(201);
        $this->seeJson($event);
    }
    
    public function testCreateEventForNonexistentPlant()
    {
        $now = new \DateTime();
        
        $event = [
            'plantName' => 'plant',
            'plantedDate' => $now->format(\DateTime::ATOM)
        ];
        
        $this->createEvent($event);
        $this->assertResponseStatus(400);
    }
    
    public function testCreateEventMissingRequiredField()
    {
        $this->createPlant('plant', 'P2M', 'P3M');
        
        $now = new \DateTime();
        
        $event = [
            'plantName' => 'plant'
        ];
        
        $this->createEvent($event);
        $this->assertResponseStatus(400);
    }
    
    public function testCreateEventInvalidFieldValue()
    {
        $this->createPlant('plant', 'P2M', 'P3M');
        
        $now = new \DateTime();
        
        $event = [
            'plantName' => 'plant',
            'plantedDate' => 5
        ];
        
        $this->createEvent($event);
        $this->assertResponseStatus(400);
    }
    
    public function testCreateEventWithReadyDateBeforePlantDate() {
        $this->createPlant('plant', 'P2M', 'P3M');
        
        $now = new \DateTime();
        $nextMonth = new \DateTime('next month');
        
        $event = [
            'plantName' => 'plant',
            'plantedDate' => $nextMonth->format(\DateTime::ATOM),
            'readyDate' => $now->format(\DateTime::ATOM)
        ];
        
        $this->createEvent($event);
        $this->assertResponseStatus(400);
    }
    
    public function testUpdateEvent()
    {
        $this->createPlant('plant', 'P2M', 'P3M');
        
        $now = new \DateTime();
        $nextMonth = new \DateTime('next month');
        
        $event = [
            'plantName' => 'plant',
            'plantedDate' => $now->format(\DateTime::ATOM)
        ];
        
        $this->createEvent($event);
        
        $json = json_decode($this->response->content(), true);
        $id = $json['id'];
        
        $event += [
            'id' => $id,
            'readyDate' => $nextMonth->format(\DateTime::ATOM),
            'isDead' => true,
            'harvests' => [1, 2, 3],
        ];
        
        $this->updateEvent('1', $event);
        $this->assertResponseOk();
        
        $this->seeJson($event);
    }
    
    public function testUpdateNonexistentEvent()
    {
        $this->createPlant('plant', 'P2M', 'P3M');
        
        $now = new \DateTime();
        $nextMonth = new \DateTime('next month');
        
        $event = [
            'id' => 1,
            'plantName' => 'plant',
            'plantedDate' => $now->format(\DateTime::ATOM),
            'readyDate' => $nextMonth->format(\DateTime::ATOM),
            'isDead' => true,
            'harvests' => [1, 2, 3],
        ];
        
        $this->updateEvent('unknown', $event);
        $this->assertResponseStatus(404);
        $this->assertEmpty($this->response->getContent());
    }
    
    public function testUpdateEventRemovesFields()
    {
        $this->createPlant('plant', 'P2M', 'P3M');
        
        $now = new \DateTime();
        $nextMonth = new \DateTime('next month');
        
        $event = [
            'plantName' => 'plant',
            'plantedDate' => $now->format(\DateTime::ATOM),
            'readyDate' => $nextMonth->format(\DateTime::ATOM),
            'harvests' => [1, 2, 3]
        ];
        
        $this->createEvent($event);
        
        $json = json_decode($this->response->content(), true);
        $id = $json['id'];
        
        $event['id'] = $id;
        unset($event['harvests']);
        
        $this->updateEvent('1', $event);
        $this->assertResponseOk();
        
        $expectedEvent = [
            'id' => $id,
            'plantName' => 'plant',
            'plantedDate' => $now->format(\DateTime::ATOM),
            'readyDate' => $nextMonth->format(\DateTime::ATOM),
            'harvests' => []
        ];
        
        $this->seeJson($expectedEvent);
    }
    
    public function testUpdateEventBringBackDeadPlant()
    {
        $this->createPlant('plant', 'P2M', 'P3M');
        
        $now = new \DateTime();
        $nextMonth = new \DateTime('next month');
        
        $event = [
            'plantName' => 'plant',
            'plantedDate' => $now->format(\DateTime::ATOM),
            'readyDate' => $nextMonth->format(\DateTime::ATOM),
            'isDead' => true
        ];
        
        $this->createEvent($event);
        
        $json = json_decode($this->response->content(), true);
        $id = $json['id'];
        
        $event['id'] = $id;
        $event['isDead'] = false;
        
        $this->updateEvent('1', $event);
        $this->assertResponseStatus(400);
        
        unset($event['isDead']);
        
        $this->updateEvent('1', $event);
        $this->assertResponseStatus(400);
    }
    
    public function testUpdateEventWithReadyDateBeforePlantDate() {
        $this->createPlant('plant', 'P2M', 'P3M');
        
        $now = new \DateTime();
        $lastMonth = new \DateTime('last month');
        
        $event = [
            'plantName' => 'plant',
            'plantedDate' => $now->format(\DateTime::ATOM),
        ];
        
        $this->createEvent($event);
        
        $json = json_decode($this->response->content(), true);
        $id = $json['id'];
        
        $event['id'] = $id;
        $event['readyDate'] = $lastMonth->format(\DateTime::ATOM);
        
        $this->updateEvent('1', $event);
        $this->assertResponseStatus(400);
    }
    
    public function testUpdateEventSetPlantedDate() {
        $this->createPlant('plant', 'P2M', 'P3M');
        
        $now = new \DateTime();
        $nextMonth = new \DateTime('next month');
        
        $event = [
            'plantName' => 'plant',
            'plantedDate' => $now->format(\DateTime::ATOM),
            'readyDate' => $nextMonth->format(\DateTime::ATOM)
        ];
        
        $this->createEvent($event);
        
        $json = json_decode($this->response->content(), true);
        $id = $json['id'];
        
        $event['id'] = $id;
        $event['plantedDate'] = $nextMonth->format(\DateTime::ATOM);
        
        $this->updateEvent('1', $event);
        $this->assertResponseStatus(400);
    }
    
    public function testGetEvent()
    {
        $this->createPlant('plant', 'P2M', 'P3M');
        
        $now = new \DateTime();
        $nextMonth = new \DateTime('next month');
        
        $event = [
            'plantName' => 'plant',
            'plantedDate' => $now->format(\DateTime::ATOM),
            'readyDate' => $nextMonth->format(\DateTime::ATOM)
        ];
        
        $this->createEvent($event);
        
        $this->getEvent('1');
        $this->assertResponseOk();
        $this->seeJson($event);
    }
    
    public function testGetNonexistentEvent()
    {
        $this->getEvent('unknown');
        $this->assertResponseStatus(404);
        $this->assertEmpty($this->response->getContent());
    }
    
    public function testDeleteEvent()
    {
        $this->createPlant('plant', 'P2M', 'P3M');
        
        $now = new \DateTime();
        $nextMonth = new \DateTime('next month');
        
        $event = [
            'plantName' => 'plant',
            'plantedDate' => $now->format(\DateTime::ATOM),
            'readyDate' => $nextMonth->format(\DateTime::ATOM)
        ];
        
        $this->createEvent($event);
        
        $this->deleteEvent('1');
        $this->assertResponseStatus(204);
        
        $this->getEvent('1');
        $this->assertResponseStatus(404);
        $this->assertEmpty($this->response->getContent());
    }
    
    public function testDeleteNonexistentEvent()
    {
        $this->deleteEvent('unknown');
        $this->assertResponseStatus(404);
        $this->assertEmpty($this->response->getContent());
    }
    
    private function createPlant($name, $growTime, $harvestTime) {
        $plant = [
            'name' => $name,
            'growTime' => $growTime,
            'harvestTime' => $harvestTime,
            'difficulty' => 1,
            'taste' => 1,
            'rarity' => 1,
            'pricePerUnit' => 1,
            'unitPerSquareFoot' => 1
        ];
        
        $this->call(
            'POST',
            '/plants',
            [],
            [],
            [],
            $this->getAuthorizationHeader() +
            $this->getAcceptJSONHeader() +
            $this->getJSONContentTypeHeader(),
            json_encode($plant));
    }
    
    private function updatePlant($name, $growTime, $harvestTime) {
        $plant = [
            'name' => $name,
            'growTime' => $growTime,
            'harvestTime' => $harvestTime,
            'difficulty' => 1,
            'taste' => 1,
            'rarity' => 1,
            'pricePerUnit' => 1,
            'unitPerSquareFoot' => 1
        ];
        
        $this->call(
            'PUT',
            '/plants/' . $name,
            [],
            [],
            [],
            $this->getAuthorizationHeader() +
            $this->getAcceptJSONHeader() +
            $this->getJSONContentTypeHeader(),
            json_encode($plant));
    }
    
    private function getEvent($id) {
        $this->get(
            '/calendar/' . $id,
            $this->getAuthorizationHeader() +
            $this->getAcceptJSONHeader());
    }
    
    private function createEvent(array $json) {
        $this->call(
            'POST',
            '/calendar',
            [],
            [],
            [],
            $this->getAuthorizationHeader() +
            $this->getAcceptJSONHeader() +
            $this->getJSONContentTypeHeader(),
            json_encode($json));
    }
    
    private function updateEvent($id, array $json) {
        $this->call(
            'PUT',
            '/calendar/' . $id,
            [],
            [],
            [],
            $this->getAuthorizationHeader() +
            $this->getAcceptJSONHeader() +
            $this->getJSONContentTypeHeader(),
            json_encode($json));
    }
    
    private function deleteEvent($id) {
        $this->delete(
            '/calendar/' . $id,
            [],
            $this->getAuthorizationHeader());
    }
}