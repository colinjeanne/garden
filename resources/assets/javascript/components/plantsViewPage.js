import PlantList from './plantList';
import PlantListAddBox from './plantListAddBox';
import PlantView from './plantView';
import React from 'react';

const plantsViewPage = props => {
    let plantView;
    if (props.selectedPlant) {
        plantView = (
            <PlantView
                plant={props.selectedPlant}
                editing={props.editing}
                onEdit={props.onEdit}
                onUpdatePlant={props.onUpdatePlant} />
        );
    }
    
    return (
        <div id="content" className="plantsViewPage">
            <PlantListAddBox
                onAdd={props.onAddPlant} />
            <PlantList
                onFilterPlants={props.onFilterPlants}
                onSelectPlant={props.onSelectPlant}
                onSortPlants={props.onSortPlants}
                plants={props.plants}
                visiblePlantNames={props.visiblePlantNames} />
            {plantView}
        </div>
    );
};

plantsViewPage.propTypes = {
    editing: React.PropTypes.bool.isRequired,
    onAddPlant: React.PropTypes.func.isRequired,
    onEdit: React.PropTypes.func.isRequired,
    onFilterPlants: React.PropTypes.func.isRequired,
    onSelectPlant: React.PropTypes.func.isRequired,
    onSortPlants: React.PropTypes.func.isRequired,
    onUpdatePlant: React.PropTypes.func.isRequired,
    plants: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    selectedPlant: React.PropTypes.object,
    visiblePlantNames: React.PropTypes.arrayOf(
        React.PropTypes.string).isRequired
};

export default plantsViewPage;