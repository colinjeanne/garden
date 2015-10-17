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
                options={plantOptions}
                onChange={this.props.onPlantSelect}
                ref="selectedPlant" />
            <button
                type="button"
                onClick={this.props.onAdd}>
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