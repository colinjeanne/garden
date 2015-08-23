<?php namespace App\Http\Controllers;

use App\Auth\UserProvider;
use App\Http\Controllers\Controller;
use App\Models\User;

class UserController extends Controller
{
    /**
     * The current user
     * @var App\Models\User
     */
    private $user;

    public function __construct(UserProvider $userProvider)
    {
        $this->user = $userProvider->getCurrentUser();

        $this->middleware('auth');
        $this->middleware('accept-json');
    }

    public function getMe()
    {
        return response()->json(self::userToJson($this->user));
    }

    private static function userToJson(User $user)
    {
        return [
            'links' => [
                'self' => route('getMe', $user->getId()),
                'calendar' => route('getCurrentCalendarItems', $user->getId())
            ]
        ];
    }
}
