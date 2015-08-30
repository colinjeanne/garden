import App from './components/app';
import React from 'react';
import UserActions from './actions/userActions';

const signinFailed = error => {};

React.render(
    <App />,
    document.getElementById('app')
);

window.signinSucceeded = UserActions.signInUser;
window.signinFailed = signinFailed;
