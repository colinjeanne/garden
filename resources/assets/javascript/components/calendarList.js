import CalendarItem from './calendarItem';
import React from 'react';

const calendarList = props => {
    const calendarItems = props.calendarEvents.map(
        item => {
            const plant = props.plants.find(
                plant => plant.name === item.plantName);
            return (
                <CalendarItem
                    calendarItem={item}
                    key={item.id}
                    onHarvestAdded={props.onHarvestAdded}
                    onHarvestDelayed={props.onHarvestDelayed}
                    onPlantDied={props.onPlantDied}
                    plant={plant}
                    eventType={props.eventType} />
            );
        }
    );
    
    return (
        <ol className="plantCalendarList">
            {calendarItems}
        </ol>
    );
};

calendarList.propTypes = {
    calendarEvents: React.PropTypes.array.isRequired,
    eventType: React.PropTypes.string.isRequired,
    onHarvestAdded: React.PropTypes.func.isRequired,
    onHarvestDelayed: React.PropTypes.func.isRequired,
    onPlantDied: React.PropTypes.func.isRequired,
    plants: React.PropTypes.arrayOf(
        React.PropTypes.object).isRequired
};

export default calendarList;