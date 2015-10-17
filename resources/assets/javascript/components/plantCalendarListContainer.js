import CalendarActions from '../actions/calendarActions';
import CalendarEventStore from '../stores/calendarStore';
import moment from 'moment';
import NavigationActions from '../actions/navigationActions';
import NavigationStore from '../stores/navigationStore';
import PlantCalendarAddBox from './plantCalendarAddBox';
import PlantCalendarList from './plantCalendarList';
import PlantStore from '../stores/plantStore';
import React from 'react';

export default class PlantCalendarListContainer extends React.Component {
    static get propTypes() {
        return {
            plantNames: React.PropTypes
                .arrayOf(React.PropTypes.string).isRequired,
            calendarDate: React.PropTypes.string.isRequired
        };
    }
    
    handleAddCalendarEvent() {
        const plantName = NavigationStore.getSelectedPlantName();
        CalendarActions.createCalendarEvent(
            PlantStore.getByName(plantName),
            this.props.calendarDate);
    }
    
    handleAddPlantSelect(plantName) {
        NavigationActions.selectPlant(plantName);
    }
    
    handleAddHarvest(calendarItemId, harvestAmount) {
        CalendarActions.addHarvest(
            calendarItemId,
            harvestAmount);
    }
    
    handleHarvestDelayed(calendarItemId) {
        CalendarActions.delayHarvest(calendarItemId);
    }
    
    handlePlantDied(calendarItemId) {
        CalendarActions.plantDied(calendarItemId);
    }
    
    render() {
        const utcTime = moment.utc(this.props.calendarDate);
        const title = utcTime.format('MMMM, YYYY');
        const nextMonth = utcTime.
            add(1, 'months').toISOString();
        const calendarEvents = CalendarEventStore.getReadyBetween(
            this.props.calendarDate,
            nextMonth);
        
        return (
            <div className="plantCalendarListContainer">
                <header>{title}</header>
                <section>
                    <PlantCalendarAddBox
                        plantNames={this.props.plantNames}
                        onAdd={this.handleAddCalendarEvent.bind(this)}
                        onPlantSelect={this.handleAddPlantSelect.bind(this)} />
                    <PlantCalendarList
                        calendarEvents={calendarEvents}
                        onHarvestAdded={this.handleAddHarvest.bind(this)}
                        onHarvestDelayed={this.handleHarvestDelayed.bind(this)}
                        onPlantDied={this.handlePlantDied.bind(this)} />
                </section>
            </div>
        );
    }
}
