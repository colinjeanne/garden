import React from 'react';

const plantListSearchBox = props => (
    <input
        className="plantListSearchBox"
        onChange={event => props.onChange(event.target.value)}
        placeholder="Search by name or label"
        type="search" />
);

plantListSearchBox.propTypes = {
    onChange: React.PropTypes.func.isRequired
};

export default plantListSearchBox;