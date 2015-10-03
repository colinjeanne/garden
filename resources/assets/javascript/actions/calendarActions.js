import Constants from '../constants/constants';
import Dispatcher from '../dispatcher/dispatcher';

export default class CalendarActions {
    static createCalendarEvent(plantName, calendarDate) {
        Dispatcher.dispatch({
            actionType: Constants.CALENDAR_CREATE_EVENT,
            plantName: plantName,
            calendarDate: calendarDate
        });
    }
    
    static addHarvest(id, amount) {
        Dispatcher.dispatch({
            actionType: Constants.CALENDAR_ADD_HARVEST,
            id: id,
            amount: amount
        });
    }
    
    static delayHarvest(id) {
        Dispatcher.dispatch({
            actionType: Constants.CALENDAR_DELAY_HARVEST,
            id: id
        });
    }
    
    static plantDied(id) {
        Dispatcher.dispatch({
            actionType: Constants.CALENDAR_PLANT_DIED,
            id: id
        });
    }
}
