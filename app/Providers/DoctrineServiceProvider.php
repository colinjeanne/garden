<?php namespace App\Providers;

use Doctrine\Common\Persistence\ObjectManager;
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
            ObjectManager::class,
            function ($app) {
                $isDevMode = getenv('APP_DEBUG');
                $modelsPath = realpath(__DIR__ . '/../Models');
                $config = Setup::createAnnotationMetadataConfiguration(
                    [$modelsPath],
                    $isDevMode
                );

                $connection = ['driver' => getenv('DOCTRINE_DRIVER')];
                
                if ($app->environment() === 'testing') {
                    $connection['memory'] = true;
                } else {
                    $databaseDirectory = realpath(__DIR__ . '/../../storage');
                    $databasePath = $databaseDirectory . '/database.sqlite';
                    $connection['path'] = $databasePath;
                }

                return EntityManager::create($connection, $config);
            }
        );
    }
}
