import NavigationActions from '../actions/navigationActions';
import React from 'react';

export default class PlantListSearchBox extends React.Component {
    handleChange(event) {
        NavigationActions.filterPlants(event.target.value);
    }
    
    render() {
        return (
            <input
                type="search"
                className="plantListSearchBox"
                placeholder="Search by name or label"
                onChange={this.handleChange.bind(this)} />
        );
    }
}
