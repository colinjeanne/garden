import React from 'react';

const signInPage = props => (
    <div className="signInPage">
        <div
            className="g-signin2"
            data-onfailure="signinFailed"
            data-onsuccess="signinSucceeded"></div>
    </div>
);

export default signInPage;