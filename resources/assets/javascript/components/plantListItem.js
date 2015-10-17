import React from 'react';

const plantListItem = props => (
    <li
        className="plantListItem"
        onClick={() => props.onClick(props.name)}>
        <span className="plantListItemName">{props.name}</span>
        <span className="plantListItemDetail">{props.detail}</span>
    </li>
);

plantListItem.propTypes = {
    name: React.PropTypes.string.isRequired,
    detail: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func.isRequired
};

export default plantListItem;