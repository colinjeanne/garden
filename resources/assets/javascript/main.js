import App from './components/app';
import ReactDOM from 'react-dom';
import UserActions from './actions/userActions';

const signinFailed = error => {};

ReactDOM.render(
    <App />,
    document.getElementById('app')
);

window.signinSucceeded = UserActions.signInUser;
window.signinFailed = signinFailed;
