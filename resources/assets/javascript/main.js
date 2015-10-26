import AppContainer from './components/appContainer';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import store from './stores/store';
import UserActions from './actions/userActions';

const signinFailed = error => {};

ReactDOM.render(
    <Provider store={store}>
        <AppContainer />
    </Provider>,
    document.getElementById('app')
);

window.signinSucceeded = UserActions.signInUser;
window.signinFailed = signinFailed;
