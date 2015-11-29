import CalendarAddBox from './calendarAddBox';
import CalendarList from './calendarList';
import React from 'react';

const calendarColumn = props => {
    const plantNames = props.plants.map(plant => plant.name);
    return (
        <section className="plantCalendarListContainer">
            <h1>{props.title}</h1>
            <CalendarAddBox
                onAdd={props.onCreateCalendarEvent}
                plantNames={plantNames} />
            <CalendarList
                calendarEvents={props.harvestEvents}
                eventType="harvest"
                onHarvestAdded={props.onHarvestAdded}
                onHarvestDelayed={props.onHarvestDelayed}
                onPlantDied={props.onPlantDied}
                plants={props.plants} />
            <CalendarList
                calendarEvents={props.plantedEvents}
                eventType="planted"
                onHarvestAdded={props.onHarvestAdded}
                onHarvestDelayed={props.onHarvestDelayed}
                onPlantDied={props.onPlantDied}
                plants={props.plants} />
        </section>
    );
};

calendarColumn.propTypes = {
    harvestEvents: React.PropTypes.array.isRequired,
    onCreateCalendarEvent: React.PropTypes.func.isRequired,
    onHarvestAdded: React.PropTypes.func.isRequired,
    onHarvestDelayed: React.PropTypes.func.isRequired,
    onPlantDied: React.PropTypes.func.isRequired,
    plantedEvents: React.PropTypes.array.isRequired,
    plants: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    title: React.PropTypes.string.isRequired,
};

export default calendarColumn;