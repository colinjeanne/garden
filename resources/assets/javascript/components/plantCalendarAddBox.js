import React from 'react';
import SelectBox from './selectBox';

const plantCalendarAddBox = props => {
    const plantOptions = props.plantNames.map(plantName => {
        return {
            value: plantName,
            label: plantName
        };
    });
    
    return (
        <div className="plantCalendarAddBox">
            <SelectBox
                onChange={this.props.onPlantSelect}
                options={plantOptions}
                ref="selectedPlant" />
            <button
                onClick={this.props.onAdd}
                type="button">
                Add
            </button>
        </div>
    );
};

plantCalendarAddBox.propTypes = {
    plantNames: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    onAdd: React.PropTypes.func.isRequired,
    onPlantSelect: React.PropTypes.func.isRequired
};

export default plantCalendarAddBox;