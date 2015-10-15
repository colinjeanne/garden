import NavigationActions from '../actions/navigationActions';
import React from 'react';

const tabbedNavigationButton = props => (
    <li className="tabbedNavigationButton">
        <input
            type="radio"
            name="tab"
            id={this.props.id}
            onChange={() => this.props.onSelect(this.props.id)} />
        <label htmlFor={this.props.id}>{this.props.title}</label>
    </li>
);

tabbedNavigationButton.propTypes = {
    id: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    onSelect: React.PropTypes.func.isRequired
};

export default tabbedNavigationButton;