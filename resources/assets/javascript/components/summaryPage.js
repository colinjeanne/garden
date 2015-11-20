import moment from 'moment';
import React from 'react';
import SummaryList from './summaryList';

const summaryPage = props => {
    return (
        <div id="content" className="summaryPage">
            <SummaryList
                calendarEvents={props.calendarEvents}
                plants={props.plants} />
        </div>
    );
};

summaryPage.propTypes = {
    calendarEvents: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    endDate: React.PropTypes.string.isRequired,
    startDate: React.PropTypes.string.isRequired,
    plants: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
};

export default summaryPage;