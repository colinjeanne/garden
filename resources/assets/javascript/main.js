import App from './components/app';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import store from './stores/store';
import UserActions from './actions/userActions';

const signinFailed = error => {};

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);

window.signinSucceeded = UserActions.signInUser;
window.signinFailed = signinFailed;
