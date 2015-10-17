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
    tabs: React.PropTypes.arrayOf(
        React.PropTypes.shape({
            title: React.PropTypes.string.isRequired,
            key: React.PropTypes.string.isRequired
        })).isRequired,
    onSelect: React.PropTypes.func.isRequired
};