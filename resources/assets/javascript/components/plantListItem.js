import React from 'react';

const plantListItem = props => (
    <li
        className="plantListItem"
        onClick={() => this.props.onClick(this.props.name)}>
        <span className="plantListItemName">{this.props.name}</span>
        <span className="plantListItemDetail">{this.props.detail}</span>
    </li>
);

plantListItem.propTypes = {
    name: React.PropTypes.string.isRequired,
    detail: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func.isRequired
};

export default plantListItem;