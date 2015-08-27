import TabbedNavigationButton from './tabbedNavigationButton';
import React from 'react';

export default class TabbedNavigation extends React.Component {
    static get propTypes() {
        return {
            tabs: React.PropTypes.arrayOf(
                React.PropTypes.shape({
                    title: React.PropTypes.string.isRequired,
                    key: React.PropTypes.string.isRequired
                })).isRequired
        };
    }
    
    render() {
        let children = this.props.tabs.map(
            item => {
                return (
                    <TabbedNavigationButton
                        id={item.key}
                        key={item.key}
                        title={item.title} />
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
    }
}
