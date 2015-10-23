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
    onChange: React.PropTypes.func.isRequired,
    options: React.PropTypes.arrayOf(
        React.PropTypes.shape({
            label: React.PropTypes.string.isRequired,
            value: React.PropTypes.string.isRequired
        })
    )
};

export default selectBox;