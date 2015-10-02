import PlantStore from '../stores/plantStore';
import React from 'react';

export default class PlantDataList extends React.Component {
    static get propTypes() {
        return {
            listId: React.PropTypes.string.isRequired,
            plantNames: React.PropTypes
                .arrayOf(React.PropTypes.string).isRequired
        };
    }
    
    render() {
        const plantOptions = this.props.plantNames.map(name =>
            <option key={name} value={name} />);
        
        return (
            <datalist id={this.props.listId}>
                {plantOptions}
            </datalist>
        );
    }
}
