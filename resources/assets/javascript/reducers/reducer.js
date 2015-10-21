import calendar from './calendar';
import {combineReducers } from 'redux';
import plants from './plants';
import user from './user';

export default combineReducers({
    calendar,
    plants,
    user
});