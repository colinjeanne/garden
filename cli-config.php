<?php
use Doctrine\ORM\Tools\Console\ConsoleRunner;
use Illuminate\Foundation\Application;

$app = require_once __DIR__ . '/bootstrap/app.php';

$kernel = $app->make('Illuminate\Contracts\Console\Kernel');

$entityManager = $app->make('Doctrine\Common\Persistence\ObjectManager');

return ConsoleRunner::createHelperSet($entityManager);
