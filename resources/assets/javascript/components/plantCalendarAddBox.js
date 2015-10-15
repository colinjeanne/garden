import CalendarActions from '../actions/calendarActions';
import PlantStore from '../stores/plantStore';
import React from 'react';

export default class PlantCalendarAddBox extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            name: ''
        };
    }
    
    static get propTypes() {
        return {
            plantDataListId: React.PropTypes.string.isRequired,
            calendarDate: React.PropTypes.string.isRequired
        };
    }
    
    handleAdd() {
        const addInput = this.refs.addInput;
        const name = addInput.value.trim();
        const plant = PlantStore.getByName(name);
        if (!plant) {
            addInput.setCustomValidity('Unknown plant');
        } else {
            addInput.setCustomValidity('');
        }
        
        if (addInput.checkValidity()) {
            CalendarActions.createCalendarEvent(
                PlantStore.getByName(name),
                this.props.calendarDate);
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
                    list={this.props.plantDataListId}
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
