import TabbedNavigationButton from './tabbedNavigationButton';
import React from 'react';

export default class TabbedNavigation extends React.Component {
    render() {
        let children = this.props.data.map(
            item => {
                return (
                    <TabbedNavigationButton
                        id={item.key}
                        key={item.key}
                        title={item.title}
                        onTabSelect={item.handleSelect} />
                );
            }
        );
        
        return (
            <ol className="tabbedNavigation">
                {children}
            </ol>
        );
    }
}
