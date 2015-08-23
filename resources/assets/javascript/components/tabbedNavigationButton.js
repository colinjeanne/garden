import React from 'react';

export default class TabbedNavigationButton extends React.Component {
    handleChange() {
        this.props.onTabSelect({
            id: this.props.id
        });
    }
    
    render() {
        return (
            <li className="tabbedNavigationButton">
                <input
                    type="radio"
                    name="tab"
                    id={this.props.id}
                    onChange={this.handleChange.bind(this)} />
                <label htmlFor={this.props.id}>{this.props.title}</label>
            </li>
        );
    }
}
