import calendar from './calendar';
import {combineReducers } from 'redux';
import plants from './plants';
import plantsView from './plantsView';
import user from './user';

export default combineReducers({
    calendar,
    plants,
    plantsView,
    user
});