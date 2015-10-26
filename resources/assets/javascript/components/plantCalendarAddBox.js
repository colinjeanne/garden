import React from 'react';
import SelectBox from './selectBox';

export default class PlantCalendarAddBox extends React.Component {
    static get propTypes() {
        return {
            onAdd: React.PropTypes.func.isRequired,
            plantNames: React.PropTypes.arrayOf(
                React.PropTypes.string).isRequired
        };
    }
    
    render() {
        const plantOptions = this.props.plantNames.map(plantName => {
            return {
                value: plantName,
                label: plantName
            };
        });
        
        return (
            <div className="plantCalendarAddBox">
                <SelectBox
                    options={plantOptions}
                    ref={r => this.select = r} />
                <button
                    onClick={() => this.props.onAdd(this.select.selectedValue())}
                    type="button">
                    Add
                </button>
            </div>
        );
    }
}