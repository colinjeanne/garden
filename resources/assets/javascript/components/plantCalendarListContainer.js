import CalendarEventStore from '../stores/calendarStore';
import moment from 'moment';
import PlantCalendarAddBox from './plantCalendarAddBox';
import PlantCalendarList from './plantCalendarList';
import React from 'react';

export default class PlantCalendarListContainer extends React.Component {
    static get propTypes() {
        return {
            calendarDate: React.PropTypes.string.isRequired,
        };
    }
    
    render() {
        const utcTime = moment.utc(this.props.calendarDate);
        const title = utcTime.format('MMMM, YYYY');
        const nextMonth = utcTime.
            add(1, 'months').toISOString();
        const calendarEvents = CalendarEventStore.getReadyBetween(
            this.props.calendarDate,
            nextMonth);
        
        return (
            <div className="plantCalendarListContainer">
                <header>{title}</header>
                <section>
                    <PlantCalendarAddBox />
                    <PlantCalendarList
                        calendarEvents={calendarEvents} />
                </section>
            </div>
        );
    }
}
