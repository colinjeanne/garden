import React from 'react';

export default class PlantListSortBox extends React.Component {
    static get propTypes() {
        return {
            onChange: React.PropTypes.func.isRequired,
        };
    }
    
    handleChange(event) {
        this.props.onChange(event.target.value);
    }
    
    render() {
        return (
            <select onChange={this.handleChange.bind(this)}>
                <option value="alphabetical">Sort by name</option>
                <option value="value">Sort by value</option>
            </select>
        );
    }
}
