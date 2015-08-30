import React from 'react';

export default class SignInPage extends React.Component {
    render() {
        return (
            <div className="signInPage">
                <div
                  className="g-signin2"
                  data-onsuccess="signinSucceeded"
                  data-onfailure="signinFailed"></div>
            </div>
        );
    }
}
