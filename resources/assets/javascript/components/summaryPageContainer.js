import { bindActionCreators } from 'redux';
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
    const startDate = moment.
        utc();
    const endDate = moment.
        utc().
        add(1, 'month');
    const calendarEvents = state.calendar.events.
        filter(filterHarvestEvents(startDate, endDate, state.plants.plants));
    
    return {
        calendarEvents: calendarEvents,
        endDate: endDate.format('YYYY-MM-DDThh:mm:ssZ'),
        plants: state.plants.plants,
        startDate: startDate.format('YYYY-MM-DDThh:mm:ssZ')
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SummaryPage);