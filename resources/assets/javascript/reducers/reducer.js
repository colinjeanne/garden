import calendar from './calendar';
import calendarPage from './calendarPage';
import {combineReducers } from 'redux';
import navigation from './navigation';
import plants from './plants';
import plantsView from './plantsView';
import summary from './summary';
import user from './user';

export default combineReducers({
    calendar,
    calendarPage,
    navigation,
    plants,
    plantsView,
    summary,
    user
});