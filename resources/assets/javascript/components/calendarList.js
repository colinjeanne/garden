import CalendarItem from './calendarItem';
import React from 'react';

const calendarList = props => {
    const calendarItems = props.calendarEvents.map(
        item => {
            return (
                <CalendarItem
                    calendarItem={item}
                    key={item.id}
                    onHarvestAdded={props.onHarvestAdded}
                    onHarvestDelayed={props.onHarvestDelayed}
                    onPlantDied={props.onPlantDied} />
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
    onHarvestAdded: React.PropTypes.func.isRequired,
    onHarvestDelayed: React.PropTypes.func.isRequired,
    onPlantDied: React.PropTypes.func.isRequired
};

export default calendarList;