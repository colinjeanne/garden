<?php namespace App\Exceptions;

use Exception;
use Laravel\Lumen\Exceptions\Handler as ExceptionHandler;
use Respect\Validation\Exceptions\ValidationExceptionInterface as ValidationException;

class Handler extends ExceptionHandler {

    /**
     * A list of the exception types that should not be reported.
     *
     * @var array
     */
    protected $dontReport = [
        'Symfony\Component\HttpKernel\Exception\HttpException'
    ];

    /**
     * Report or log an exception.
     *
     * This is a great spot to send exceptions to Sentry, Bugsnag, etc.
     *
     * @param  \Exception  $e
     * @return void
     */
    public function report(Exception $e)
    {
        return parent::report($e);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $e
     * @return \Illuminate\Http\Response
     */
    public function render($request, Exception $e)
    {
        $log = app()->make('Psr\Log\LoggerInterface');
        if ($e instanceof ValidationException) {
            $log->info($e->getMainMessage());
            return response($e->getMainMessage(), 400);
        } else if ($this->shouldReport($e)) {
            $log->critical((string)$e);
            return response((string)$e, 500);
        }
        
        return parent::render($request, $e);
    }

}
