import React from 'react';

const signInPage = props => {
    const className = props.signedIn ? 'signInPage signedIn' : 'signInPage';
    return (
        <div className={className}>
            <div
                className="g-signin2"
                data-onfailure="signinFailed"
                data-onsuccess="signinSucceeded"></div>
        </div>
    );
};

signInPage.propTypes = {
    signedIn: React.PropTypes.bool.isRequired
};

export default signInPage;