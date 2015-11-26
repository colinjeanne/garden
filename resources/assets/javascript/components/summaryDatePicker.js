import DatePicker from './datePicker';
import moment from 'moment';
import React from 'react';

const startBound = (startDate, endDate) => {
    return moment.utc(startDate).startOf('year').toISOString();
};

const endBound = (startDate, endDate) => {
    return moment.utc(endDate).endOf('year').toISOString();
};

const summaryDatePicker = props => {
    const startDate = startBound(props.startDate, props.endDate);
    const endDate = startBound(props.startDate, props.endDate);
    
    return (
        <div className="summaryDatePicker">
            <span>
                Planting Summary:
            </span>
            <DatePicker
                defaultValue={props.startDate}
                endDate={endDate}
                onChange={props.onStartDateChange}
                startDate={startDate} />
            <span>
                to:
            </span>
            <DatePicker
                defaultValue={props.endDate}
                endDate={endDate}
                onChange={props.onEndDateChange}
                startDate={startDate} />
        </div>
    );
};

summaryDatePicker.propTypes = {
    endDate: React.PropTypes.string.isRequired,
    onEndDateChange: React.PropTypes.func.isRequired,
    onStartDateChange: React.PropTypes.func.isRequired,
    startDate: React.PropTypes.string.isRequired
};

export default summaryDatePicker;