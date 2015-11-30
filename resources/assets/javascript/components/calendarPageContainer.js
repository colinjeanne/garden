import {
    addHarvest,
    createCalendarEvent,
    delayHarvest,
    plantDied } from '../actions/calendarActions';
import { bindActionCreators } from 'redux';
import CalendarPage from './calendarPage';
import { connect } from 'react-redux';
import React from 'react';
import { updateCurrentDate } from '../actions/navigationActions';

const mapStateToProps = state => {
    return {
        calendarEvents: state.calendar.events,
        currentDate: state.calendarPage.currentDate,
        plants: state.plants.plants
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        onCreateCalendarEvent: createCalendarEvent,
        onHarvestAdded: addHarvest,
        onHarvestDelayed: delayHarvest,
        onPlantDied: plantDied,
        onUpdateCurrentDate: updateCurrentDate
    },
    dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarPage);