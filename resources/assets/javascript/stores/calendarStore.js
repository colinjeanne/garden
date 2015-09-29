import Constants from '../constants/constants';
import Dispatcher from '../dispatcher/dispatcher';
import {EventEmitter} from 'events';
import moment from 'moment';
import shortId from 'shortid';

const CHANGE_EVENT = 'change';
let calendarEvents = new Map();
let idToken = null;

const create = (plant, plantedDate) => {
    const plantedDateMoment = moment.utc(plantedDate);
    if (!plantedDateMoment.isValid()) {
        throw new Error(`Invalid planted date ${plantedDate}`);
    }
    
    const id = shortId.generate();
    const growTime = moment.duration(plant.growTime);
    const readyDate = moment.
        utc(plantedDateMoment).
        add(growTime).
        toISOString();
    
    return calendarEvents.set(
        id,
        {
            id: id,
            plant: plant,
            plantedDate: plantedDateMoment.toISOString(),
            readyDate: readyDate,
            isDelayed: false,
            isDead: false,
            harvests: []
        });
};

const tempEvents = [
    create({
        growTime: 'P1M',
        name: 'One Month',
        unit: 'Bunches'
    }, '2015-08-01T00:00:00+00:00'),
    
    create({
        growTime: 'P7M',
        name: 'Seven Month',
        unit: 'Bowls'
    }, '2015-04-01T00:00:00-08:00'),
    
    create({
        growTime: 'P3M',
        name: 'Three Month',
        unit: 'Barges'
    }, '2015-06-01T00:00:00+00:00'),
    
    create({
        growTime: 'P2M',
        name: 'Two Month',
        unit: 'Borks'
    }, '2015-07-01T00:00:00+00:00'),
    
    create({
        growTime: 'P2M',
        name: 'Next Month',
        unit: 'Barks'
    }, '2015-09-01T00:00:00+00:00')
];

const destroy = id => calendarEvents.delete(id);

const update = (id, updates) => {
    const calendarEvent = Object.assign({}, calendarEvents.get(id), updates);
    calendarEvents.set(id, calendarEvent);
};

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

const getCalendarEvents = idToken =>
    fetch(
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
    then(json => {
        calendarEvents = new Map();
        return json.map(plantEvent => update(plantEvent.id, plantEvent));
    }).
    catch(err => console.log(err));

const createRemotely = (idToken, calendarEvent) =>
    fetch(
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
    catch(err => console.log(err));

const updateRemotely = (idToken, calendarEvent) =>
    fetch(
        `/calendar/${calendarEvent.id}`,
        {
            method: 'PUT',
            headers: getPostOrPutHeaders(idToken),
            body: JSON.stringify(calendarEvent)
        }).
    then(response => {
        if (!response.ok) {
            throw new Error(`Request failed: ${response.status}`);
        }
        
        return response.json();
    }).
    catch(err => console.log(err));

class CalendarEventStore extends EventEmitter {
    getReadyBetween(startDate, endDate) {
        const startDateMoment = moment.utc(startDate);
        const endDateMoment = moment.utc(endDate);
        let events = [];
        for (let value of calendarEvents.values()) {
            const readyMoment = moment.utc(value.readyDate);
            if (readyMoment.isBetween(startDateMoment, endDateMoment) ||
                readyMoment.isSame(startDateMoment)) {
                events.push(value);
            }
        }
        
        return events;
    }
    
    emitChange() {
        this.emit(CHANGE_EVENT);
    }
    
    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    }
    
    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
}

const calendarEventStore = new CalendarEventStore();

calendarEventStore.dispatchToken = Dispatcher.register(action => {
    switch (action.actionType) {
        case Constants.SHOW_PAGE:
            if (action.page === Constants.CALENDAR_PAGE) {
                calendarEventStore.emitChange();
                /*getCalendarEvents(idToken).
                    then(() => calendarEventStore.emitChange());*/
            }
            
            break;
        
        case Constants.USER_SIGNIN:
            idToken = action.user.getAuthResponse()['id_token'];
            break;
    }
});

export default calendarEventStore;