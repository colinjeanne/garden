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
        
        $plant2 = [
            'name' => 'plant2',
            'growTime' => 'P1M',
            'harvestTime' => 'P1M',
            'difficulty' => 1,
            'taste' => 1,
            'rarity' => 1,
            'pricePerUnit' => 1,
            'unitPerSquareFoot' => 1
        ];
        
        $this->createPlant($plant2);
        
        $this->get(
            '/plants',
            $this->getAuthorizationHeader() +
            $this->getAcceptJSONHeader())
            ->assertResponseOk();
        
        $this->seeJson($plant);
        $this->seeJson($plant2);
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
        
        $this->createPlant($plant);
        $this->assertResponseStatus(201);
        $this->seeJson($plant);
    }
    
    public function testCreatePlantWithOptionalFields()
    {
        $plant = [
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
            'links' => ['self' => 'http://localhost/plants/plant'],
            'value' => 1
        ];
        
        $this->createPlant($plant);
        $this->assertResponseStatus(201);
        $this->seeJson($plant);
    }
    
    public function testCreateSamePlantTwice()
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
        
        $this->createPlant($plant);
        $this->assertResponseStatus(201);
        
        $this->createPlant($plant);
        $this->assertResponseStatus(400);
    }
    
    public function testCreateMissingRequiredField()
    {
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
    
    public function testCreateInvalidFieldValue()
    {
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
    
    public function testUpdatePlant()
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
        
        $this->createPlant($plant);
        
        $plant['unit'] = 'oz';
        $this->updatePlant($plant['name'], $plant);
        $this->assertResponseOk();
        
        $this->seeJson($plant);
    }
    
    public function testUpdateNonexistentPlant()
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
        
        $this->updatePlant($plant['name'], $plant);
        $this->assertResponseStatus(404);
        $this->assertEmpty($this->response->getContent());
    }
    
    public function testGetPlant()
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
        
        $this->createPlant($plant);
        
        $this->getPlant($plant['name']);
        $this->assertResponseOk();
        
        $this->seeJson($plant);
    }
    
    public function testGetNonexistentPlant()
    {
        $this->getPlant('plant');
        $this->assertResponseStatus(404);
        $this->assertEmpty($this->response->getContent());
    }
    
    private function createPlant(array $json) {
        $this->call(
            'POST',
            '/plants',
            [],
            [],
            [],
            $this->getAuthorizationHeader() +
            $this->getAcceptJSONHeader() +
            $this->getJSONContentTypeHeader(),
            json_encode($json));
    }
    
    private function getPlant($name) {
        $this->get(
            '/plants/' . $name,
            $this->getAuthorizationHeader() +
            $this->getAcceptJSONHeader());
    }
    
    private function updatePlant($name, array $json) {
        $this->call(
            'PUT',
            '/plants/' . $name,
            [],
            [],
            [],
            $this->getAuthorizationHeader() +
            $this->getAcceptJSONHeader() +
            $this->getJSONContentTypeHeader(),
            json_encode($json));
    }
}