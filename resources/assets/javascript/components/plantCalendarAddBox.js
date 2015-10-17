import React from 'react';

const plantCalendarAddBox = props => {
    const options = this.props.plantNames.map(plantName =>
        <option
            key={plantName}
            value={plantName} />);
    
    const handleClick = () => {
        const selectedPlant = this.refs.selectedPlant;
        const plantName = selectedPlant.selectedOptions[0].value;
        this.props.onAdd(plantName);
    };
    
    return (
        <div className="plantCalendarAddBox">
            <select ref="selectedPlant">
                {options}
            </select>
            <button
                type="button"
                onClick={handleClick}>
                Add
            </button>
        </div>
    );
};

plantCalendarAddBox.propTypes = {
    plantNames: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    onAdd: React.PropTypes.func.isRequired
};

export default plantCalendarAddBox;