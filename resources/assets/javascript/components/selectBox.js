import React from 'react';

const selectedValue = event => event.target.selectedOptions[0].value;

export default class SelectBox extends React.Component {
    static get propTypes() {
        return {
            defaultValue: React.PropTypes.string,
            onChange: React.PropTypes.func,
            options: React.PropTypes.arrayOf(
                React.PropTypes.shape({
                    label: React.PropTypes.string.isRequired,
                    value: React.PropTypes.string.isRequired
                })
            ).isRequired
        };
    }
    
    selectedValue() {
        if (this.select.selectedOptions.length > 0) {
            return this.select.selectedOptions[0].value;
        }
        
        return null;
    }
    
    handleChange(event) {
        if (this.props.onChange) {
            this.props.onChange(this.selectedValue());
        }
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
                defaultValue={this.props.defaultValue}
                onChange={this.handleChange.bind(this)}
                ref={r => this.select = r}>
                {options}
            </select>
        );
    }
}