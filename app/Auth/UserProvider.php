<?php namespace App\Auth;

interface UserProvider
{
    /**
     * Gets the current user.
     *
     * @return App\Models\User The current user
     */
    public function getCurrentUser();
}
