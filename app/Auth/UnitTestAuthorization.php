<?php namespace App\Auth;

class UnitTestAuthorization implements JwtAuthorization
{
    public function getClaims($jwt)
    {
        return [
            'iss' => getenv('CLAIM_ISSUER'),
            'sub' => getenv('CLAIM_SUBJECT')
        ];
    }
}
