import moment from 'moment';
import CalendarColumn from './calendarColumn';
import React from 'react';

const isBetween = (checkDate, startDate, endDate) =>
    startDate.isSame(checkDate) ||
    (startDate.isBefore(checkDate) && endDate.isAfter(checkDate));

const filterEvents = (startDate, endDate, plants) => event => {
    const plantedDate = moment.utc(event.plantedDate);
    const readyDate = moment.utc(event.readyDate);
    const harvestTime = moment.duration(
            plants.find(plant => plant.name === event.plantName).
            harvestTime);
    const lastReadyDate = moment.utc(readyDate).add(harvestTime);
    
    return isBetween(plantedDate, startDate, endDate) ||
        isBetween(readyDate, startDate, endDate) ||
        isBetween(lastReadyDate, startDate, endDate);
};

const calendarPage = props => {
    const plantNames = props.plants.map(plant => plant.name);
    const titleFormat = 'MMMM, YYYY';
    const currentMonth = moment.utc(props.currentDate).
        startOf('month');
    
    const nextMonth = moment.utc(currentMonth).
        add(1, 'months');
    
    const monthAfter = moment.utc(currentMonth).
        add(2, 'months');
    
    const currentEvents = props.calendarEvents.
        filter(filterEvents(currentMonth, nextMonth, props.plants));
    const nextEvents = props.calendarEvents.
        filter(filterEvents(nextMonth, monthAfter, props.plants));
    
    const createCalendarEvent = calendarDate => addedPlantName =>
        props.onCreateCalendarEvent(addedPlantName, calendarDate);
    
    return (
        <div id="content" className="calendarPage">
            <CalendarColumn
                calendarEvents={currentEvents}
                plantNames={plantNames}
                onCreateCalendarEvent={createCalendarEvent(currentMonth)}
                onHarvestAdded={props.onHarvestAdded}
                onHarvestDelayed={props.onHarvestDelayed}
                onPlantDied={props.onPlantDied}
                title={currentMonth.format(titleFormat)} />
            <CalendarColumn
                calendarEvents={nextEvents}
                plantNames={plantNames}
                onCreateCalendarEvent={createCalendarEvent(nextMonth)}
                onHarvestAdded={props.onHarvestAdded}
                onHarvestDelayed={props.onHarvestDelayed}
                onPlantDied={props.onPlantDied}
                title={nextMonth.format(titleFormat)} />
        </div>
    );
};

calendarPage.propTypes = {
    calendarEvents: React.PropTypes.arrayOf(
        React.PropTypes.object).isRequired,
    currentDate: React.PropTypes.string.isRequired,
    onCreateCalendarEvent: React.PropTypes.func.isRequired,
    onHarvestAdded: React.PropTypes.func.isRequired,
    onHarvestDelayed: React.PropTypes.func.isRequired,
    onPlantDied: React.PropTypes.func.isRequired,
    plants: React.PropTypes
        .arrayOf(React.PropTypes.object).isRequired
};

export default calendarPage;