import React from 'react';

export default class PlantListItem extends React.Component {
    static get propTypes() {
        return {
            onClick: React.PropTypes.func.isRequired
        };
    }
    
    render() {
        return (
            <li
                className="plantListItem"
                onClick={this.props.onClick}>
                <span className="plantListItemName">{this.props.name}</span>
                <span className="plantListItemDetail">{this.props.detail}</span>
            </li>
        );
    }
}
