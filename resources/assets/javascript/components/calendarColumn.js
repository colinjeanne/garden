import CalendarAddBox from './calendarAddBox';
import CalendarList from './calendarList';
import React from 'react';

const calendarColumn = props => (
    <div className="plantCalendarListContainer">
        <header>{props.title}</header>
        <section>
            <CalendarAddBox
                onAdd={props.onCreateCalendarEvent}
                plantNames={props.plantNames} />
            <CalendarList
                calendarEvents={props.calendarEvents}
                onHarvestAdded={props.onHarvestAdded}
                onHarvestDelayed={props.onHarvestDelayed}
                onPlantDied={props.onPlantDied} />
        </section>
    </div>
);

calendarColumn.propTypes = {
    calendarEvents: React.PropTypes.arrayOf(
        React.PropTypes.object).isRequired,
    plantNames: React.PropTypes
        .arrayOf(React.PropTypes.string).isRequired,
    onCreateCalendarEvent: React.PropTypes.func.isRequired,
    onHarvestAdded: React.PropTypes.func.isRequired,
    onHarvestDelayed: React.PropTypes.func.isRequired,
    onPlantDied: React.PropTypes.func.isRequired,
    title: React.PropTypes.string.isRequired,
};

export default calendarColumn;