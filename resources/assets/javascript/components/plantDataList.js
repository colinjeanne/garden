import React from 'react';

const plantDataList = props => {
    const plantOptions = props.plantNames.map(name =>
        <option key={name} value={name} />);
    
    return (
        <datalist id={props.listId}>
            {plantOptions}
        </datalist>
    );
};

plantDataList.propTypes = {
    listId: React.PropTypes.string.isRequired,
    plantNames: React.PropTypes
        .arrayOf(React.PropTypes.string).isRequired
};