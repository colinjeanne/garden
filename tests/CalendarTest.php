<?php

class CalendarTestTest extends TestCase
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
        $this->createPlant('plant2', 'P1M', 'P1M');
        $this->createPlant('plant3', 'P5M', 'P6M');
        
        $this->markTestIncomplete();
        
        $event = [
            'id' => 'plant',
            'plantName' => 'P1M',
            'plantedDate' => 'P1M',
            'readyDate' => 1
        ];
        
        $event = [
            'id' => 'plant',
            'plantName' => 'P1M',
            'plantedDate' => 'P1M',
            'readyDate' => 1
        ];
        
        $this->get(
            '/calendar',
            $this->getAuthorizationHeader() +
            $this->getAcceptJSONHeader())
            ->assertResponseOk();
        
        $this->seeJson($plant);
        $this->seeJson($plant2);
    }
    
    public function testGetEventsBetweenDates() {
        $this->markTestIncomplete();
    }
    
    public function testCreateEvent()
    {
        $this->createPlant('plant', 'P2M', 'P3M');
        
        $now = new \DateTime();
        
        $event = [
            'id' => 'plant',
            'plantName' => 'plant',
            'plantedDate' => $now->format(\DateTime::ATOM)
        ];
        
        $this->createEvent($event);
        $this->assertResponseStatus(201);
        $this->seeJson($event);
    }
    
    public function testCreateEventWithOptionalFields()
    {
        $this->createPlant('plant', 'P2M', 'P3M');
        
        $now = new \DateTime();
        $nextMonth = new \DateTime('next month');
        
        $event = [
            'id' => 'plant',
            'plantName' => 'plant',
            'plantedDate' => $now->format(\DateTime::ATOM),
            'readyDate' => $nextMonth->format(\DateTime::ATOM),
            'isDead' => false,
            'harvests' => [1, 50],
            'links' => [
                'self' => 'http://localhost/calendar/plant',
                'plant' => 'http://localhost/plants/plant'
            ]
        ];
        
        $this->createEvent($event);
        $this->assertResponseStatus(201);
        $this->seeJson($event);
    }
    
    public function testCreateSameEventTwice()
    {
        $this->createPlant('plant', 'P2M', 'P3M');
        
        $now = new \DateTime();
        
        $event = [
            'id' => 'plant',
            'plantName' => 'plant',
            'plantedDate' => $now->format(\DateTime::ATOM)
        ];
        
        $this->createEvent($event);
        $this->assertResponseStatus(201);
        $this->seeJson($event);
        
        $this->createEvent($event);
        $this->assertResponseStatus(400);
    }
    
    public function testCreateEventForNonexistentPlant()
    {
        $now = new \DateTime();
        $nextMonth = new \DateTime('next month');
        
        $event = [
            'id' => 'plant',
            'plantName' => 'plant',
            'plantedDate' => $now->format(\DateTime::ATOM)
        ];
        
        $this->createEvent($event);
        $this->assertResponseStatus(400);
    }
    
    public function testCreateEventMissingRequiredField()
    {
        $this->markTestIncomplete();
        $plant = [
            'name' => 'plant',
            'growTime' => 'P1M',
            'harvestTime' => 'P1M',
            'difficulty' => 1,
            'taste' => 1,
            'rarity' => 1,
            'pricePerUnit' => 1
        ];
        
        $this->createPlant($plant);
        $this->assertResponseStatus(400);
    }
    
    public function testCreateEventInvalidFieldValue()
    {
        $this->markTestIncomplete();
        $plant = [
            'name' => 'plant',
            'growTime' => 'P1M',
            'harvestTime' => 'P1M',
            'difficulty' => 1,
            'taste' => 1,
            'rarity' => 1,
            'pricePerUnit' => 1,
            'unitPerSquareFoot' => 'foo'
        ];
        
        $this->createPlant($plant);
        $this->assertResponseStatus(400);
    }
    
    public function testUpdateEvent()
    {
        $this->markTestIncomplete();
        $plant = [
            'name' => 'plant',
            'growTime' => 'P1M',
            'harvestTime' => 'P1M',
            'difficulty' => 1,
            'taste' => 1,
            'rarity' => 1,
            'pricePerUnit' => 1,
            'unitPerSquareFoot' => 1
        ];
        
        $this->createPlant($plant);
        
        $plant['unit'] = 'oz';
        $this->updatePlant($plant['name'], $plant);
        $this->assertResponseOk();
        
        $this->seeJson($plant);
    }
    
    public function testUpdateNonexistentEvent()
    {
        $this->markTestIncomplete();
        $plant = [
            'name' => 'plant',
            'growTime' => 'P1M',
            'harvestTime' => 'P1M',
            'difficulty' => 1,
            'taste' => 1,
            'rarity' => 1,
            'pricePerUnit' => 1,
            'unitPerSquareFoot' => 1
        ];
        
        $this->updatePlant($plant['name'], $plant);
        $this->assertResponseStatus(404);
        $this->assertEmpty($this->response->getContent());
    }
    
    public function testUpdateEventRemovesFields()
    {
        $this->markTestIncomplete();
        $plant = [
            'name' => 'plant',
            'growTime' => 'P1M',
            'harvestTime' => 'P1M',
            'difficulty' => 1,
            'taste' => 1,
            'rarity' => 1,
            'pricePerUnit' => 1,
            'unit' => 'unit',
            'unitPerSquareFoot' => 1,
            'notes' => 'notes',
            'label' => 'label',
        ];
        
        $this->createPlant($plant);
        
        unset($plant['unit']);
        unset($plant['notes']);
        unset($plant['label']);
        
        $this->updatePlant($plant['name'], $plant);
        $this->assertResponseOk();
        
        $updatedPlant = [
            'name' => 'plant',
            'growTime' => 'P1M',
            'harvestTime' => 'P1M',
            'difficulty' => 1,
            'taste' => 1,
            'rarity' => 1,
            'pricePerUnit' => 1,
            'unit' => '',
            'unitPerSquareFoot' => 1,
            'notes' => '',
            'label' => '',
        ];
        
        $this->seeJson($plant);
    }
    
    public function testUpdateEventBringBackDeadPlant()
    {
        $this->markTestIncomplete();
        $plant = [
            'name' => 'plant',
            'growTime' => 'P1M',
            'harvestTime' => 'P1M',
            'difficulty' => 1,
            'taste' => 1,
            'rarity' => 1,
            'pricePerUnit' => 1,
            'unit' => 'unit',
            'unitPerSquareFoot' => 1,
            'notes' => 'notes',
            'label' => 'label',
        ];
        
        $this->createPlant($plant);
        
        unset($plant['unit']);
        unset($plant['notes']);
        unset($plant['label']);
        
        $this->updatePlant($plant['name'], $plant);
        $this->assertResponseOk();
        
        $updatedPlant = [
            'name' => 'plant',
            'growTime' => 'P1M',
            'harvestTime' => 'P1M',
            'difficulty' => 1,
            'taste' => 1,
            'rarity' => 1,
            'pricePerUnit' => 1,
            'unit' => '',
            'unitPerSquareFoot' => 1,
            'notes' => '',
            'label' => '',
        ];
        
        $this->seeJson($plant);
    }
    
    public function testGetEvent()
    {
        $this->markTestIncomplete();
        $plant = [
            'name' => 'plant',
            'growTime' => 'P1M',
            'harvestTime' => 'P1M',
            'difficulty' => 1,
            'taste' => 1,
            'rarity' => 1,
            'pricePerUnit' => 1,
            'unitPerSquareFoot' => 1
        ];
        
        $this->createPlant($plant);
        
        $this->getPlant($plant['name']);
        $this->assertResponseOk();
        
        $this->seeJson($plant);
    }
    
    public function testGetNonexistentEvent()
    {
        $this->markTestIncomplete();
        $this->getEvent('unknown');
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
}