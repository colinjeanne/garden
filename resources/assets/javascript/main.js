import AppContainer from './components/appContainer';
import { getAllPlants } from './actions/plantActions';
import { getCalendarEvents } from './actions/calendarActions';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { signInUser } from './actions/userActions';
import store from './stores/store';

ReactDOM.render(
    <Provider store={store}>
        <AppContainer />
    </Provider>,
    document.getElementById('app')
);

window.signinSucceeded = user => {
    store.dispatch(signInUser(user));
    store.dispatch(getAllPlants());
    store.dispatch(getCalendarEvents()); // TEMPORARY
};

window.signinFailed = error => store.dispatch(signInUser(error));