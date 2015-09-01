import PlantActions from '../actions/plantActions';
import React from 'react';

export default class PlantListAddBox extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            name: ''
        };
    }
    
    handleAdd() {
        const addInput = React.findDOMNode(this.refs.addInput);
        const name = addInput.value.trim();
        
        if (name.length < 2) {
            addInput.setCustomValidity('Name must be at least two characters');
        } else {
            addInput.setCustomValidity('');
        }
        
        if (addInput.checkValidity()) {
            PlantActions.createPlant(name);
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
            <div className="plantListAddBox">
                <input
                    type="text"
                    placeholder="Plant name"
                    size="12"
                    maxLength="100"
                    value={this.state.name}
                    ref="addInput"
                    onChange={this.handleChange.bind(this)} />
                <button
                    type="button"
                    onClick={this.handleAdd.bind(this)}>
                    Add
                </button>
            </div>
        );
    }
}
