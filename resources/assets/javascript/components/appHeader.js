import React from 'react';

export default class AppHeader extends React.Component {
    constructor(props) {
        super(props);
        
        this.propType = {
            displayName: React.PropTypes.string
        };
    }
    
    render() {
        return (
            <header>
                Kathy's Garden Planner
                <span id="userContainer">{this.props.displayName}</span>
            </header>
        );
    }
}