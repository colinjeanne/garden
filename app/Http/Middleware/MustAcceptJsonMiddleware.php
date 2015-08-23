<?php namespace App\Http\Middleware;

use Closure;

class MustAcceptJsonMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if ($request->wantsJson()) {
            return $next($request);
        }

        abort(406);
    }
}
