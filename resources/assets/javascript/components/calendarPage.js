import moment from 'moment';
import PlantCalendarList from './plantCalendarList';
import React from 'react';

export default class CalendarPage extends React.Component {
    static get propTypes() {
        return {
            currentDate: React.PropTypes.string.isRequired,
        };
    }
    
    render() {
        const currentMonth = moment.utc(this.props.currentDate).
            format('MMMM, YYYY');
        
        return (
            <div className="calendarPage">
                <PlantCalendarList
                    calendarDate={currentMonth} />
            </div>
        );
    }
}
