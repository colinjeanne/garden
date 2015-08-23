import React from 'react';

export default class PlantListSearchBox extends React.Component {
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
            <input
                type="search"
                className="plantListSearchBox"
                placeholder="Search by name or label"
                onChange={this.handleChange.bind(this)} />
        );
    }
}
