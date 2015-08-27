import App from './components/app';
import React from 'react';

const signinSucceeded = googleUser => {};
const signinFailed = error => {};

React.render(
    <App />,
    document.getElementById('app')
);

window.signinSucceeded = signinSucceeded;
window.signinFailed = signinFailed;
