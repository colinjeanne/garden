import PlantCalendarAddBox from './plantCalendarAddBox';
import PlantCalendarList from './plantCalendarList';
import React from 'react';

const plantCalendarListContainer = props => (
    <div className="plantCalendarListContainer">
        <header>{props.title}</header>
        <section>
            <PlantCalendarAddBox
                onAdd={props.onCreateCalendarEvent}
                plantNames={props.plantNames} />
            <PlantCalendarList
                calendarEvents={props.calendarEvents}
                onHarvestAdded={props.onHarvestAdded}
                onHarvestDelayed={props.onHarvestDelayed}
                onPlantDied={props.onPlantDied} />
        </section>
    </div>
);

plantCalendarListContainer.propTypes = {
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

export default plantCalendarListContainer;