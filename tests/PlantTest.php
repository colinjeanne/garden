<?php

class PlantTest extends TestCase
{
    public function testGetAllPlants()
    {
        $this->get(
            '/plants',
            $this->getAuthorizationHeader() +
            $this->getAcceptJSONHeader())
            ->assertResponseOk();
        
        $this->seeJsonEquals([]);
        $this->markTestIncomplete();
    }
    
    public function testCreatePlant()
    {
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
            
        $this->assertResponseStatus(201);
        
        $this->markTestIncomplete();
    }
    
    public function testGetPlant()
    {
        $this->markTestIncomplete();
    }
    
    public function testUpdatePlant()
    {
        $this->markTestIncomplete();
    }
}