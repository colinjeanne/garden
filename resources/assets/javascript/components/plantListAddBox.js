import React from 'react';

export default class PlantListAddBox extends React.Component {
    static get propTypes() {
        return {
            onAdd: React.PropTypes.func.isRequired
        };
    }
    
    handleAdd() {
        const addInput = this.refs.addInput;
        const name = addInput.value.trim();
        
        if (name.length < 2) {
            addInput.setCustomValidity('Name must be at least two characters');
        } else {
            addInput.setCustomValidity('');
        }
        
        if (addInput.checkValidity()) {
            this.props.onAdd(name);
            addInput.value = '';
        }
    }
    
    render() {
        return (
            <div className="plantListAddBox">
                <input
                    maxLength="100"
                    placeholder="Plant name"
                    ref="addInput"
                    size="12"
                    type="text" />
                <button
                    onClick={this.handleAdd.bind(this)}
                    type="button">
                    Add
                </button>
            </div>
        );
    }
}