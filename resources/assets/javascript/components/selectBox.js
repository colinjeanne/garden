import React from 'react';

const selectedValue = event => e.target.selectedOptions[0].value;

const selectBox = props => {
    const options = props.options.map(option =>
        <option
            key={option.value}
            value={option.value}>
            {option.label}
        </option>
    );
    
    return (
        <select onChange={event => props.onChange(selectedValue(event))}>
            {options}
        </select>
    );
};

selectBox.propTypes = {
    options: React.PropTypes.arrayOf(
        React.PropTypes.shape({
            value: React.PropTypes.string.isRequired,
            label: React.PropTypes.string.isRequired
        })
    ),
    onChange: React.PropTypes.func.isRequired
};

export default selectBox;