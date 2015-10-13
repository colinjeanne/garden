<?php namespace App\Http\Middleware;

use Closure;
use Psr\Log\LoggerInterface as Log;

class RequestLoggerMiddleware
{
    /**
     * The current request's logger
     * 
     * @var Psr\Log\LoggerInterface
     */
    private $log;

    public function __construct(Log $log)
    {
        $this->log = $log;
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
        $startTime = microtime(true);
        $this->log->info(
            'Start request',
            [
                'method' => $request->method(),
                'path' => '/' . $request->path(),
                'time' => $startTime
            ]);
        
        $response = $next($request);
        
        $endTime = microtime(true);
        $this->log->info(
            'End request',
            [
                'status' => $response->status(),
                'time' => $endTime,
                'duration' => $endTime - $startTime
            ]);
        
        return $response;
    }
}
