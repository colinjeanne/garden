import TabbedNavigationButton from './tabbedNavigationButton';
import React from 'react';

const tabbedNavigation = props => {
    const children = props.tabs.map(
        item => {
            return (
                <TabbedNavigationButton
                    id={item.key}
                    key={item.key}
                    title={item.title}
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
    tabs: React.PropTypes.arrayOf(
        React.PropTypes.shape({
            key: React.PropTypes.string.isRequired,
            title: React.PropTypes.string.isRequired
        })).isRequired
};

export default tabbedNavigation;