import Constants from '../constants/constants';
import { createAction } from 'redux-actions';
import moment from 'moment';

const getCalendarEventsAction = createAction(Constants.GET_CALENDAR_EVENTS);

const getIdTokenFromState = state => state.user.idToken;
const getCalendarEventFromState = (state, eventId) =>
    state.calendar.events.find(event => event.id === eventId);

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
    dispatch({
        type: Constants.CREATE_CALENDAR_EVENT,
        payload: calendarEvent,
        meta: {
            volatile: true
        }
    });
    
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
    then(json => dispatch({
        type: Constants.CREATE_CALENDAR_EVENT,
        payload: json
    })).
    catch(err => dispatch({
        type: Constants.CREATE_CALENDAR_EVENT,
        payload: err,
        error: true
    }));
};

export const addHarvest = (eventId, amount) => (dispatch, getState) => {
    const idToken = getIdTokenFromState(getState());
    const calendarEvent = getCalendarEventFromState(getState(), eventId);
    const updatedFields = {
        harvests: [
            amount,
            ...calendarEvent.harvests
        ]
    };
    
    const updatedCalendarEvent = Object.assign(
        {}, 
        calendarEvent, 
        updatedFields);
    
    dispatch({
        type: Constants.ADD_HARVEST,
        payload: updatedCalendarEvent,
        meta: {
            volatile: true
        }
    });
    
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
    then(json => dispatch({
        type: Constants.ADD_HARVEST,
        payload: json
    })).
    catch(err => dispatch({
        type: Constants.ADD_HARVEST,
        payload: err,
        error: true
    }));
};

export const delayHarvest = eventId => (dispatch, getState) => {
    const idToken = getIdTokenFromState(getState());
    const calendarEvent = getCalendarEventFromState(getState(), eventId);
    const updatedReadyDate = moment.utc(calendarEvent.readyDate).
        add(1, 'months').
        format('YYYY-MM-DDThh:mm:ssZ');
    const updatedFields = { readyDate: updatedReadyDate };
    
    const updatedCalendarEvent = Object.assign(
        {}, 
        calendarEvent, 
        updatedFields);
    
    dispatch({
        type: Constants.DELAY_HARVEST,
        payload: updatedCalendarEvent,
        meta: {
            volatile: true
        }
    });
    
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
    then(json => dispatch({
        type: Constants.DELAY_HARVEST,
        payload: json
    })).
    catch(err => dispatch({
        type: Constants.DELAY_HARVEST,
        payload: err,
        error: true
    }));
};

export const plantDied = eventId => (dispatch, getState) => {
    const idToken = getIdTokenFromState(getState());
    const calendarEvent = getCalendarEventFromState(getState(), eventId);
    const updatedFields = { isDead: true };
    
    const updatedCalendarEvent = Object.assign(
        {}, 
        calendarEvent, 
        updatedFields);
    
    dispatch({
        type: Constants.PLANT_DIED,
        payload: updatedCalendarEvent,
        meta: {
            volatile: true
        }
    });
    
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
    then(json => dispatch({
        type: Constants.PLANT_DIED,
        payload: json
    })).
    catch(err => dispatch({
        type: Constants.PLANT_DIED,
        payload: err,
        error: true
    }));
};