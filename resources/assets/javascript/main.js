import AppContainer from './components/appContainer';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { signInUser } from './actions/userActions';
import store from './stores/store';

ReactDOM.render(
    <Provider store={store}>
        <AppContainer />
    </Provider>,
    document.getElementById('app')
);

window.signinSucceeded = signInUser;
window.signinFailed = signInUser;