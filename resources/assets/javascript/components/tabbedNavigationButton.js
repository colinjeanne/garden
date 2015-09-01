import NavigationActions from '../actions/navigationActions';
import React from 'react';

export default class TabbedNavigationButton extends React.Component {
    static get propTypes() {
        return {
            id: React.PropTypes.string.isRequired,
            title: React.PropTypes.string.isRequired
        };
    }
    
    handleChange() {
        NavigationActions.showPage(this.props.id);
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
