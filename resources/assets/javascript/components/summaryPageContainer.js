import { bindActionCreators } from 'redux';
import { changeSummaryStartDate, changeSummaryEndDate } from './../actions/navigationActions';
import { connect } from 'react-redux';
import moment from 'moment';
import React from 'react';
import SummaryPage from './summaryPage';

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

const mapStateToProps = state => {
    const calendarEvents = state.calendar.events.
        filter(
            filterHarvestEvents(
                moment.utc(state.summary.startDate),
                moment.utc(state.summary.endDate),
                state.plants.plants));
    
    return {
        calendarEvents: calendarEvents,
        endDate: state.summary.endDate,
        plants: state.plants.plants,
        startDate: state.summary.startDate
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        onEndDateChange: changeSummaryEndDate,
        onStartDateChange: changeSummaryStartDate,
    },
    dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SummaryPage);