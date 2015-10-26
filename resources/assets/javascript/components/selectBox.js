import React from 'react';

const selectedValue = event => event.target.selectedOptions[0].value;

export default class SelectBox extends React.Component {
    static get propTypes() {
        return {
            onChange: React.PropTypes.func.isRequired,
            options: React.PropTypes.arrayOf(
                React.PropTypes.shape({
                    label: React.PropTypes.string.isRequired,
                    value: React.PropTypes.string.isRequired
                })
            ).isRequired
        };
    }
    
    selectedValue() {
        return this.select.selectedOptions[0].value;
    }
    
    render() {
        const options = this.props.options.map(option =>
            <option
                key={option.value}
                value={option.value}>
                {option.label}
            </option>
        );
        
        return (
            <select
                onChange={event =>
                    this.props.onChange(selectedValue(event))}
                ref={r => this.select = r}>
                {options}
            </select>
        );
    }
}