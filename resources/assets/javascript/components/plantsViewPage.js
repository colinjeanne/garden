import PlantList from './plantList';
import PlantListAddBox from './plantListAddBox';
import PlantView from './plantView';
import React from 'react';

export default class PlantsViewPage extends React.Component {
    static get propTypes() {
        return {
            editing: React.PropTypes.bool.isRequired,
            filter: React.PropTypes.func.isRequired,
            onAddPlant: React.PropTypes.func.isRequired,
            onEdit: React.PropTypes.func.isRequired,
            plants: React.PropTypes.object.isRequired,
            selectedPlantName: React.PropTypes.string,
            sort: React.PropTypes.func.isRequired
        };
    }
    
    render() {
        let plantView;
        if (this.props.selectedPlantName) {
            plantView = (
                <PlantView
                    plantName={this.props.selectedPlantName}
                    editing={this.props.editing}
                    onEdit={this.props.onEdit} />
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