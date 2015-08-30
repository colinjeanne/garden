import PlantList from './plantList';
import PlantListAddBox from './plantListAddBox';
import PlantView from './plantView';
import React from 'react';

export default class PlantsViewPage extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            selectedPlantName: ''
        };
    }
    
    static get propTypes() {
        return {
            plants: React.PropTypes.array.isRequired,
        };
    }
    
    handleSelect(plant) {
        this.setState({
            selectedPlantName: plant.name
        });
    }
    
    render() {
        let plantView;
        if (this.state.selectedPlantName) {
            plantView = (
                <PlantView
                    plantName={this.state.selectedPlantName} />
            );
        }
        
        return (
            <div className="plantsViewPage">
                <PlantListAddBox />
                <PlantList
                    plants={this.props.plants}
                    onSelect={this.handleSelect.bind(this)} />
                {plantView}
            </div>
        );
    }
}
