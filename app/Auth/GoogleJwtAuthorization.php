<?php namespace App\Auth;

use Google_Client;
use Google_Auth_Exception;

class GoogleJwtAuthorization implements JwtAuthorization
{
    /**
     * The client used to talk to the Google API
     *
     * @var Google_Client
     */
    private $googleClient;

    public function __construct()
    {
        $this->googleClient = new Google_Client;
        $this->googleClient->setClientId(getenv('GOOGLE_CLIENT_ID'));
        $this->googleClient->setClientSecret(getenv('GOOGLE_CLIENT_SECRET'));
    }

    public function getClaims($jwt)
    {
        $claims = [];
        try {
            $token = $this->googleClient->verifyIdToken($jwt);
            $claims = $token->getAttributes()['payload'];
        } catch (Google_Auth_Exception $e) {
        }

        return $claims;
    }
}
