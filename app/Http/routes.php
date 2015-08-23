<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

$app->get('/', function() {
    return view('main', ['googleClientId' => getenv('GOOGLE_CLIENT_ID')]);
});

$app->get(
   '/me',
   [
      'as' => 'getMe',
      'uses' => 'App\Http\Controllers\UserController@getMe'
   ]
);

$app->get(
   '/plants',
   [
      'as' => 'getAllPlants',
      'uses' => 'App\Http\Controllers\PlantsController@getPlants'
   ]
);

$app->post(
   '/plants',
   [
      'as' => 'createPlant',
      'uses' => 'App\Http\Controllers\PlantsController@createPlant'
   ]
);

$app->get(
   '/plants/{plantId:\d+}',
   [
      'as' => 'getPlant',
      'uses' => 'App\Http\Controllers\PlantsController@getPlant'
   ]
);

$app->put(
   '/plants/{plantId:\d+}',
   [
      'as' => 'updatePlant',
      'uses' => 'App\Http\Controllers\PlantsController@updatePlant'
   ]
);

$app->get(
   '/calendar',
   [
      'as' => 'getCurrentCalendarItems',
      'uses' => 'App\Http\Controllers\CalendarController@getCurrent'
   ]
);

$app->post(
   '/calendar',
   [
      'as' => 'createCalendarItem',
      'uses' => 'App\Http\Controllers\CalendarController@createItem'
   ]
);

$app->get(
   '/calendar/{eventId:\d+}',
   [
      'as' => 'getCalendarItem',
      'uses' => 'App\Http\Controllers\CalendarController@getItem'
   ]
);

$app->put(
   '/calendar/{eventId:\d+}',
   [
      'as' => 'updateCalendarItem',
      'uses' => 'App\Http\Controllers\CalendarController@updateItem'
   ]
);

$app->delete(
   '/calendar/{eventId:\d+}',
   [
      'as' => 'deleteCalendarItem',
      'uses' => 'App\Http\Controllers\CalendarController@deleteItem'
   ]
);