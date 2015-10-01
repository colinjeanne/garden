import moment from 'moment';
import PlantCalendarListContainer from './plantCalendarListContainer';
import PlantDataList from './plantDataList';
import React from 'react';

export default class CalendarPage extends React.Component {
    static get propTypes() {
        return {
            currentDate: React.PropTypes.string.isRequired,
            plantNames: React.PropTypes
                .arrayOf(React.PropTypes.string).isRequired
        };
    }
    
    render() {
        const currentMonth = moment.utc(this.props.currentDate).
            date(1).
            hour(0).
            minute(0).
            second(0).
            millisecond(0).
            toISOString();
        
        const nextMonth = moment.utc(currentMonth).
            add(1, 'months').
            toISOString();
        
        return (
            <div className="calendarPage">
                <PlantDataList
                    listId="plantDataList"
                    plantNames={this.props.plantNames} />
                <PlantCalendarListContainer
                    plantDataListId="plantDataList"
                    calendarDate={currentMonth} />
                <PlantCalendarListContainer
                    plantDataListId="plantDataList"
                    calendarDate={nextMonth} />
            </div>
        );
    }
}
