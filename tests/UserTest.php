<?php

class UserTest extends TestCase
{
    public function testGetMe()
    {
        $this->get(
                '/me',
                $this->getAuthorizationHeader() +
                $this->getAcceptJSONHeader())
            ->assertResponseOk();

        $this->seeJsonEquals(
            ['links' =>
                [
                    'self' => 'http://localhost/me',
                    'calendar' => 'http://localhost/calendar'
                ]
            ]);
    }
    
    public function testGetMeUnauthorized()
    {
        $this->get('/me')
            ->assertResponseStatus(401);
    }
    
    public function testGetMeWithoutAcceptingJSON()
    {
        $this->get('/me', $this->getAuthorizationHeader())
            ->assertResponseStatus(406);
    }
}