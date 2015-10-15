import React from 'react';

const signInPage = props => (
    <div className="signInPage">
        <div
            className="g-signin2"
            data-onsuccess="signinSucceeded"
            data-onfailure="signinFailed"></div>
    </div>
);

export default signInPage;