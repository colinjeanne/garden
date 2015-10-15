import React from 'react';

const appHeader = props => (
    <header>
        Kathy's Garden Planner
        <span id="userContainer">{this.props.displayName}</span>
    </header>
);

appHeader.propTypes = {
    displayName: React.PropTypes.string
};

export default appHeader;