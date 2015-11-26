import moment from 'moment';
import React from 'react';
import SelectBox from './selectBox';

export default class DatePicker extends React.Component {
    static get propTypes() {
        return {
            defaultValue: React.PropTypes.string.isRequired,
            endDate: React.PropTypes.string.isRequired,
            onChange: React.PropTypes.func.isRequired,
            startDate: React.PropTypes.string.isRequired
        };
    }
    
    selectedMonth() {
        return parseInt(this.monthSelect.selectedValue());
    }
    
    selectedYear() {
        return parseInt(this.yearSelect.selectedValue());
    }
    
    handleChange() {
        this.props.onChange({
            month: this.selectedMonth(),
            year: this.selectedYear()
        });
    }
    
    render() {
        const startDate = moment.utc(this.props.startDate);
        const startYear = startDate.year();
        
        const endDate = moment.utc(this.props.endDate);
        const endYear = endDate.year();
        
        const defaultDate = moment.utc(this.props.defaultValue);
        
        let years = [];
        for (let i = startYear; i <= endYear; ++i) {
            years.push({
                label: i.toString(),
                value: i.toString()
            });
        }
        
        const months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ];
        
        const monthOptions = months.map((month, index) => ({
            label: month,
            value: index.toString()
        }));
        
        return (
            <div className="datePicker">
                <SelectBox
                    defaultValue={defaultDate.month().toString()}
                    onChange={this.handleChange.bind(this)}
                    options={monthOptions}
                    ref={r => this.monthSelect = r} />
                <SelectBox
                    defaultValue={defaultDate.year().toString()}
                    onChange={this.handleChange.bind(this)}
                    options={years}
                    ref={r => this.yearSelect = r} />
            </div>
        );
    }
}