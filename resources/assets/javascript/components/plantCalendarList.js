import PlantCalendarItem from './plantCalendarItem';
import React from 'react';

const plantCalendarList = props => {
    const calendarItems = props.calendarEvents.map(
        item => {
            return (
                <PlantCalendarItem
                    key={item.id}
                    calendarItem={item}
                    onHarvestAdded={props.harvestAdded}
                    onHarvestDelayed={props.harvestDelayed}
                    onPlantDied={props.plantDied} />
            );
        }
    );
    
    return (
        <ol className="plantCalendarList">
            {calendarItems}
        </ol>
    );
};

plantCalendarList.propTypes = {
    calendarEvents: React.PropTypes.array.isRequired,
    onHarvestAdded: React.PropTypes.func.isRequired,
    onHarvestDelayed: React.PropTypes.func.isRequired,
    onPlantDied: React.PropTypes.func.isRequired
};

export default plantCalendarList;