<?php

use Doctrine\Common\Persistence\ObjectManager;
use Doctrine\ORM\Tools\SchemaTool;

class TestCase extends Laravel\Lumen\Testing\TestCase
{
    /**
     * Creates the application.
     *
     * @return \Laravel\Lumen\Application
     */
    public function createApplication()
    {
        $app = require __DIR__.'/../bootstrap/app.php';
        
        $entityManager = $app->make(ObjectManager::class);
        $metadata = $entityManager->getMetadataFactory()->getAllMetadata();
        $schemaTool = new SchemaTool($entityManager);
        $schemaTool->createSchema($metadata);
        
        $this->beforeApplicationDestroyed(
            [$this, 'beforeApplicationDestroyedCallback']);
        
        $app->make('Psr\Log\LoggerInterface')->info("===Begin Test {$this->getName()} ===");
        
        return $app;
    }
    
    /**
     * Tears down the test environment
     */
    public function beforeApplicationDestroyedCallback()
    {
        $entityManager = $this->app->make(ObjectManager::class);
        $metadata = $entityManager->getMetadataFactory()->getAllMetadata();
        $schemaTool = new SchemaTool($entityManager);
        $schemaTool->dropDatabase();
    }

    /**
     * Gets a standard JWT authorization header usable by the tests
     *
     * @return array
     */
    public function getAuthorizationHeader()
    {
        $jwt = getenv('JWT');
        return ['HTTP_AUTHORIZATION' => "Bearer $jwt"];
    }
    
    /**
     * Gets headers to accept JSON responses
     *
     * @return array
     */
    public function getAcceptJSONHeader()
    {
        return ['HTTP_ACCEPT' => 'application/json'];
    }
    
    /**
     * Gets headers for JSON requests
     *
     * @return array
     */
    public function getJSONContentTypeHeader()
    {
        return ['CONTENT_TYPE' => 'application/json'];
    }
}
