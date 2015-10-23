import { addHarvest, createCalendarEvent, delayHarvest, plantDied } from '../actions/calendarActions';
import { connect } from 'react-redux';
import moment from 'moment';
import PlantCalendarAddBox from './plantCalendarAddBox';
import PlantCalendarList from './plantCalendarList';
import React from 'react';
import { selectPlant } from '../actions/navigationActions';

const mapStateToProps = state => {
    return {
        plantNames: state.plants.map(plant => plant.name),
        selectedPlantName: state.plants.selectedPlantName
    };
};

class PlantCalendarListContainer extends React.Component {
    static get propTypes() {
        return {
            calendarDate: React.PropTypes.string.isRequired,
            dispatch: React.PropTypes.func.isRequired,
            plantNames: React.PropTypes
                .arrayOf(React.PropTypes.string).isRequired,
            selectedPlantName: React.PropTypes.string
        };
    }
    
    handleAddCalendarEvent() {
        createCalendarEvent(
            this.props.selectedPlantName,
            this.props.calendarDate);
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
                        onAdd={this.handleAddCalendarEvent.bind(this)}
                        onPlantSelect={selectPlant}
                        plantNames={this.props.plantNames} />
                    <PlantCalendarList
                        calendarEvents={calendarEvents}
                        onHarvestAdded={addHarvest}
                        onHarvestDelayed={delayHarvest}
                        onPlantDied={plantDied} />
                </section>
            </div>
        );
    }
}

export default connect(mapStateToProps)(PlantCalendarListContainer);