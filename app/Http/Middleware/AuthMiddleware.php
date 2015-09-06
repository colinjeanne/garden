<?php namespace App\Http\Middleware;

use App\Auth\UserProvider;
use Closure;

class AuthMiddleware
{
    /**
     * A user provider
     * @var App\Auth\UserProvider
     */
    private $userProvider;

    /**
     * Constructs a AuthMiddleware
     *
     * @param App\Auth\UserProvider $userProvider A user provider
     */
    public function __construct(UserProvider $userProvider)
    {
        $this->userProvider = $userProvider;
    }

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $currentUser = $this->userProvider->getCurrentUser();
        if ($currentUser == null) {
            $response = response('Unauthorized', 401)
                ->header('WWW-Authenticate', 'Bearer');
            return $response;
        } else {
            return $next($request);
        }
    }
}
