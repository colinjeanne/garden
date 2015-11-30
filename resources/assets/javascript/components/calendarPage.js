import moment from 'moment';
import CalendarColumn from './calendarColumn';
import React from 'react';

const isBetween = (checkDate, startDate, endDate) =>
    startDate.isSame(checkDate) ||
    (startDate.isBefore(checkDate) && endDate.isAfter(checkDate));

const filterHarvestEvents = (startDate, endDate, plants) => event => {
    const readyDate = moment.utc(event.readyDate);
    const harvestTime = moment.duration(
            plants.find(plant => plant.name === event.plantName).
            harvestTime);
    const lastReadyDate = moment.utc(readyDate).add(harvestTime);
    
    return isBetween(readyDate, startDate, endDate) ||
        isBetween(lastReadyDate, startDate, endDate);
};

const filterPlantedEvents = (startDate, endDate, plants) => event => {
    const plantedDate = moment.utc(event.plantedDate);
    return isBetween(plantedDate, startDate, endDate);
};

const calendarPage = props => {
    const titleFormat = 'MMMM, YYYY';
    const currentMonth = moment.utc(props.currentDate).
        startOf('month');
    
    const oneMonthFromNow = moment.utc(props.currentDate).
        add(1, 'months');
        
    const oneMonthAgo = moment.utc(props.currentDate).
        subtract(1, 'months');
    
    const nextMonth = moment.utc(currentMonth).
        add(1, 'months');
    
    const monthAfter = moment.utc(currentMonth).
        add(2, 'months');
    
    const currentHarvestEvents = props.calendarEvents.
        filter(filterHarvestEvents(currentMonth, nextMonth, props.plants));
    const currentPlantedEvents = props.calendarEvents.
        filter(filterPlantedEvents(currentMonth, nextMonth, props.plants));
    const nextHarvestEvents = props.calendarEvents.
        filter(filterHarvestEvents(nextMonth, monthAfter, props.plants));
    const nextPlantedEvents = props.calendarEvents.
        filter(filterPlantedEvents(nextMonth, monthAfter, props.plants));
    
    const createCalendarEvent = calendarDate => addedPlantName =>
        props.onCreateCalendarEvent(
            addedPlantName,
            calendarDate.format('YYYY-MM-DDThh:mm:ssZ'));
    
    return (
        <div id="content" className="calendarPage">
            <button
                onClick={() => props.onUpdateCurrentDate(
                    oneMonthAgo.format('YYYY-MM-DDThh:mm:ssZ'))}
                type="button">
                &lt;
            </button>
            <CalendarColumn
                harvestEvents={currentHarvestEvents}
                onCreateCalendarEvent={createCalendarEvent(currentMonth)}
                onHarvestAdded={props.onHarvestAdded}
                onHarvestDelayed={props.onHarvestDelayed}
                onPlantDied={props.onPlantDied}
                plantedEvents={currentPlantedEvents}
                plants={props.plants}
                title={currentMonth.format(titleFormat)} />
            <CalendarColumn
                harvestEvents={nextHarvestEvents}
                onCreateCalendarEvent={createCalendarEvent(nextMonth)}
                onHarvestAdded={props.onHarvestAdded}
                onHarvestDelayed={props.onHarvestDelayed}
                onPlantDied={props.onPlantDied}
                plantedEvents={nextPlantedEvents}
                plants={props.plants}
                title={nextMonth.format(titleFormat)} />
            <button
                onClick={() => props.onUpdateCurrentDate(
                    oneMonthFromNow.format('YYYY-MM-DDThh:mm:ssZ'))}
                type="button">
                &gt;
            </button>
        </div>
    );
};

calendarPage.propTypes = {
    calendarEvents: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    currentDate: React.PropTypes.string.isRequired,
    onCreateCalendarEvent: React.PropTypes.func.isRequired,
    onHarvestAdded: React.PropTypes.func.isRequired,
    onHarvestDelayed: React.PropTypes.func.isRequired,
    onPlantDied: React.PropTypes.func.isRequired,
    onUpdateCurrentDate: React.PropTypes.func.isRequired,
    plants: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
};

export default calendarPage;