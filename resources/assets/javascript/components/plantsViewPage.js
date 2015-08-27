import PlantList from './plantList';
import PlantListAddBox from './plantListAddBox';
import PlantStore from '../stores/plantStore';
import PlantView from './plantView';
import React from 'react';

export default class PlantsViewPage extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            plants: PlantStore.getAll(),
            
            selectedPlantName: ''
        };
    }
    
    componentDidMount() {
        PlantStore.addChangeListener(this.handlePlantStoreChange.bind(this));
    }
    
    componentWillUnmount() {
        PlantStore.removeChangeListener(this.handlePlantStoreChange);
    }
    
    handleSelect(plant) {
        this.setState({
            selectedPlantName: plant.name
        });
    }
    
    handlePlantStoreChange() {
        this.setState({
            plants: PlantStore.getAll()
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
                    plants={this.state.plants}
                    onSelect={this.handleSelect.bind(this)} />
                {plantView}
            </div>
        );
    }
}
