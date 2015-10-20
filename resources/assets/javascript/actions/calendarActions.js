import Constants from '../constants/constants';
import { createAction } from 'redux-actions';
import { fetch, Headers } from 'isomorphic-fetch';
import moment from 'moment';

const getCalendarEventsAction = createAction(Constants.GET_CALENDAR_EVENTS);
const createCalendarEventAction = createAction(Constants.CREATE_CALENDAR_EVENT);
const delayHarvestAction = createAction(Constants.DELAY_HARVEST);
const plantDiedAction = createAction(Constants.PLANT_DIED);

const getIdTokenFromState = state => state.user.idToken;
const getCalendarEventFromState = (state, eventId) =>
    state.calendarEvents[eventId];

const getGetHeaders = idToken =>
    new Headers({
        'Authorization': `Bearer ${idToken}`,
        'Accept': 'application/json'
    });

const getPostOrPutHeaders = idToken =>
    new Headers({
        'Authorization': `Bearer ${idToken}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    });

const getDeleteHeaders = idToken =>
    new Headers({
        'Authorization': `Bearer ${idToken}`
    });

export const getCalendarEvents = (startDate, endDate) => (dispatch, getState) => {
    dispatch(getCalendarEventsAction(startDate, endDate));
    
    const idToken = getIdTokenFromState(getState());
    return fetch(
        '/calendar',
        {
            method: 'GET',
            headers: getGetHeaders(idToken)
        }).
    then(response => {
        if (!response.ok) {
            throw new Error(`Request failed: ${response.status}`);
        }
        
        return response.json();
    }).
    then(json => dispatch(getCalendarEventsAction(json))).
    catch(err => dispatch({
        type: Constants.GET_CALENDAR_EVENTS,
        payload: err,
        error: true
    }));
};

export const createCalendarEvent = (plantName, plantedDate) => (dispatch, getState) => {
    const calendarEvent = { plantName, plantedDate };
    dispatch(createCalendarEventAction(calendarEvent));
    
    const idToken = getIdTokenFromState(getState());
    return fetch(
        '/calendar',
        {
            method: 'POST',
            headers: getPostOrPutHeaders(idToken),
            body: JSON.stringify(calendarEvent)
        }).
    then(response => {
        if (!response.ok) {
            throw new Error(`Request failed: ${response.status}`);
        }
        
        return response.json();
    }).
    then(json => dispatch(createCalendarEventAction(json))).
    catch(err => dispatch({
        type: Constants.CREATE_CALENDAR_EVENT,
        payload: err,
        error: true
    }));
};

export const delayHarvest = eventId => (dispatch, getState) => {
    dispatch(delayHarvestAction(eventId));
    
    const idToken = getIdTokenFromState(getState());
    const calendarEvent = getCalendarEventFromState(getState(), eventId);
    const updatedReadyDate = moment.utc(calendarEvent.readyDate).
        add(1, 'months');
    const updatedFields = { readyDate: updatedReadyDate };
    
    const updatedCalendarEvent = Object.assign(
        {}, 
        calendarEvent, 
        updatedFields);
    
    return fetch(
        `/calendar/${eventId}`,
        {
            method: 'PUT',
            headers: getPostOrPutHeaders(idToken),
            body: JSON.stringify(updatedCalendarEvent)
        }).
    then(response => {
        if (!response.ok) {
            throw new Error(`Request failed: ${response.status}`);
        }
        
        return response.json();
    }).
    then(json => dispatch(delayHarvestAction(json))).
    catch(err => dispatch({
        type: Constants.DELAY_HARVEST,
        payload: err,
        error: true
    }));
};

export const plantDied = eventId => (dispatch, getState) => {
    dispatch(plantDiedAction(eventId));
    
    const idToken = getIdTokenFromState(getState());
    const calendarEvent = getCalendarEventFromState(getState(), eventId);
    const updatedFields = { isDead: true };
    
    const updatedCalendarEvent = Object.assign(
        {}, 
        calendarEvent, 
        updatedFields);
    
    return fetch(
        `/calendar/${eventId}`,
        {
            method: 'PUT',
            headers: getPostOrPutHeaders(idToken),
            body: JSON.stringify(updatedCalendarEvent)
        }).
    then(response => {
        if (!response.ok) {
            throw new Error(`Request failed: ${response.status}`);
        }
        
        return response.json();
    }).
    then(json => dispatch(plantDiedAction(json))).
    catch(err => dispatch({
        type: Constants.PLANT_DIED,
        payload: err,
        error: true
    }));
};