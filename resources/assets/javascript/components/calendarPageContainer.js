import {
    addHarvest,
    createCalendarEvent,
    delayHarvest,
    plantDied } from '../actions/calendarActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import CalendarPage from './calendarPage';
import React from 'react';

const mapStateToProps = state => {
    return {
        calendarEvents: state.calendar.events,
        currentDate: moment.utc().toISOString(),
        plants: state.plants.plants
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        onCreateCalendarEvent: createCalendarEvent,
        onHarvestAdded: addHarvest,
        onHarvestDelayed: delayHarvest,
        onPlantDied: plantDied
    },
    dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarPage);