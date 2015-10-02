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
}
