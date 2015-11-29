import React from 'react';

const appHeader = props => {
    const className = props.displayName ? 'g-signin2 signedIn' : 'g-signin2';
    return (
        <header>
            Kathy's Garden Planner
            <span id="userContainer">{props.displayName}</span>
            <div
                className={className}
                data-onfailure="signinFailed"
                data-onsuccess="signinSucceeded"></div>
        </header>
    )};

appHeader.propTypes = {
    displayName: React.PropTypes.string
};

export default appHeader;