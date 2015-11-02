<?php namespace App\Auth;

use Google_Client;
use Google_Exception;
use Psr\Log\LoggerInterface as Log;

class GoogleJwtAuthorization implements JwtAuthorization
{
    /**
     * The client used to talk to the Google API
     *
     * @var Google_Client
     */
    private $googleClient;

    public function __construct(Log $log)
    {
        $this->googleClient = new Google_Client;
        $this->googleClient->setClientId(getenv('GOOGLE_CLIENT_ID'));
        $this->googleClient->setClientSecret(getenv('GOOGLE_CLIENT_SECRET'));
        $this->googleClient->setLogger($log);
    }

    public function getClaims($jwt)
    {
        $claims = [];
        try {
            $userData = $this->googleClient->verifyIdToken($jwt);
            if ($userData) {
                $claims = $userData['payload'];
            }
        } catch (Google_Exception $e) {
        }

        return $claims;
    }
}
