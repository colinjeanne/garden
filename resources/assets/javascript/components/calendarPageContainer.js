import {
    addHarvest,
    createCalendarEvent,
    delayHarvest,
    plantDied } from '../actions/calendarActions';
import { connect } from 'react-redux';
import moment from 'moment';
import PlantViewPage from './plantViewPage';
import React from 'react';

const mapStateToProps = state => {
    return {
        calendarEvents: state.calendar.events,
        currentDate: moment.utc().toISOString(),
        plants: state.plants.plants
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onCreateCalendarEvent: createCalendarEvent,
        onHarvestAdded: addHarvest,
        onHarvestDelayed: delayHarvest,
        onPlantDied: plantDied
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlantViewPage);