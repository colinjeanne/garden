<?php namespace App\Providers;

use Doctrine\ORM\EntityManager;
use Doctrine\ORM\Tools\Setup;
use Illuminate\Support\ServiceProvider;

class DoctrineServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton(
            'Doctrine\Common\Persistence\ObjectManager',
            function($app) {
                $isDevMode = getenv('APP_DEBUG');
                $modelsPath = realpath(__DIR__ . '/../Models');
                $config = Setup::createAnnotationMetadataConfiguration(
                    [$modelsPath], $isDevMode);

                $databaseDirectory = realpath(__DIR__ . '/../../storage');
                $databasePath = $databaseDirectory . '/database.sqlite';
                $connection = [
                    'driver' => getenv('DOCTRINE_DRIVER'),
                    'path' => $databasePath,
                ];

                return EntityManager::create($connection, $config);
            });
    }
}
