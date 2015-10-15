import PlantList from './plantList';
import PlantListAddBox from './plantListAddBox';
import PlantView from './plantView';
import React from 'react';

export default class PlantsViewPage extends React.Component {
    static get propTypes() {
        return {
            plants: React.PropTypes.object.isRequired,
            selectedPlantName: React.PropTypes.string,
            filterString: React.PropTypes.string.isRequired,
            sortType: React.PropTypes.string.isRequired,
            onAddPlant: React.PropType.func.isRequired
        };
    }
    
    render() {
        let plantView;
        if (this.props.selectedPlantName) {
            plantView = (
                <PlantView
                    plantName={this.props.selectedPlantName} />
            );
        }
        
        return (
            <div id="content" className="plantsViewPage">
                <PlantListAddBox
                    onAdd={this.props.onAddPlant} />
                <PlantList
                    plants={this.props.plants}
                    filterString={this.props.filterString}
                    sortType={this.props.sortType} />
                {plantView}
            </div>
        );
    }
}