import calendar from './calendar';
import {combineReducers } from 'redux';
import navigation from './navigation';
import plants from './plants';
import plantsView from './plantsView';
import user from './user';

export default combineReducers({
    calendar,
    navigation,
    plants,
    plantsView,
    user
});