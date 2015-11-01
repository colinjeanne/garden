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

                $driver = getenv('DOCTRINE_DRIVER');
                $connection = ['driver' => $driver];
                
                if ($app->environment() === 'testing') {
                    $connection['memory'] = true;
                } elseif ($driver === 'pdo_sqlite') {
                    $databaseDirectory = realpath(__DIR__ . '/../../storage');
                    $databasePath = $databaseDirectory . '/database.sqlite';
                    $connection['path'] = $databasePath;
                } else {
                    $connection['url'] = getenv('DATABASE_URL');
                }

                return EntityManager::create($connection, $config);
            }
        );
    }
}
