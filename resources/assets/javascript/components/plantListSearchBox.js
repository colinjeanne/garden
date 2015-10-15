import React from 'react';

const plantListSearchBox = props => (
    <input
        type="search"
        className="plantListSearchBox"
        placeholder="Search by name or label"
        onChange={event => this.props.onChange(event.target.value)} />
);

plantListSearchBox.propTypes = {
    onChange: React.PropTypes.func.isRequired
};

export default plantListSearchBox;