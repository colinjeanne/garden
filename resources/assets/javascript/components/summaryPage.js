import React from 'react';
import SummaryDatePicker from './summaryDatePicker';
import SummaryList from './summaryList';

const summaryPage = props => {
    return (
        <div id="content" className="summaryPage">
            <h1>Planting Summary</h1>
            <SummaryDatePicker
                endDate={props.endDate}
                onEndDateChange={props.onEndDateChange}
                onStartDateChange={props.onStartDateChange}
                startDate={props.startDate} />
            <SummaryList
                calendarEvents={props.calendarEvents}
                plants={props.plants} />
        </div>
    );
};

summaryPage.propTypes = {
    calendarEvents: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    endDate: React.PropTypes.string.isRequired,
    onEndDateChange: React.PropTypes.func.isRequired,
    onStartDateChange: React.PropTypes.func.isRequired,
    plants: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    startDate: React.PropTypes.string.isRequired
};

export default summaryPage;