import TabbedNavigationButton from './tabbedNavigationButton';
import React from 'react';

const tabbedNavigation = props => {
    const children = Object.getOwnPropertyNames(props.tabs).map(
        tab => {
            return (
                <TabbedNavigationButton
                    id={tab}
                    key={tab}
                    title={props.tabs[tab]}
                    onSelect={props.onSelect} />
            );
        }
    );
    
    return (
        <nav id="mainNavigation">
            <ol className="tabbedNavigation">
                {children}
            </ol>
        </nav>
    );
};

tabbedNavigation.propTypes = {
    onSelect: React.PropTypes.func.isRequired,
    tabs: React.PropTypes.objectOf(React.PropTypes.string).isRequired
};

export default tabbedNavigation;