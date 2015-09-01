import NavigationActions from '../actions/navigationActions';
import React from 'react';

export default class PlantListItem extends React.Component {
    handleClick() {
        NavigationActions.selectPlant(this.props.name);
    }
    
    render() {
        return (
            <li
                className="plantListItem"
                onClick={this.handleClick.bind(this)}>
                <span className="plantListItemName">{this.props.name}</span>
                <span className="plantListItemDetail">{this.props.detail}</span>
            </li>
        );
    }
}
