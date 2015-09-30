import PlantStore from '../stores/plantStore';
import React from 'react';

export default class PlantCalendarAddBox extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            name: ''
        };
    }
    
    handleAdd() {
        const addInput = React.findDOMNode(this.refs.addInput);
        const name = addInput.value.trim();
        const plant = PlantStore.getByName(name);
        if (!plant) {
            addInput.setCustomValidity('Unknown plant');
        } else {
            addInput.setCustomValidity('');
        }
        
        if (addInput.checkValidity()) {
            this.setState({
                name: ''
            });
        }
    }
    
    handleChange(event) {
        this.setState({
            name: event.target.value
        });
    }
    
    render() {
        return (
            <div className="plantCalendarAddBox">
                <input
                    type="text"
                    placeholder="Plant name"
                    size="12"
                    maxLength="100"
                    value={this.state.name}
                    ref="addInput"
                    onChange={this.handleChange.bind(this)} />
                <datalist id="123">
                </datalist>
                <button
                    type="button"
                    onClick={this.handleAdd.bind(this)}>
                    Add
                </button>
            </div>
        );
    }
}
