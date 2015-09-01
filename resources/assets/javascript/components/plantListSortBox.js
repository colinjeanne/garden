import Constants from '../constants/constants';
import NavigationActions from '../actions/navigationActions';
import React from 'react';

export default class PlantListSortBox extends React.Component {
    handleChange(event) {
        NavigationActions.updateSortType(event.target.value);
    }
    
    render() {
        return (
            <select onChange={this.handleChange.bind(this)}>
                <option value={Constants.SORT_TYPE_ALPHABETICAL}>Sort by name</option>
                <option value={Constants.SORT_TYPE_VALUE}>Sort by value</option>
            </select>
        );
    }
}
