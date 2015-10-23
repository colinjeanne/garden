import { connect } from 'react-redux';
import { createPlant, updatePlant } from '../actions/plantActions';
import { editPlant, savePlant } from '../actions/navigationActions';
import PlantViewPage from './plantViewPage';
import React from 'react';

const mapStateToProps = state => {
    const selectedPlant = state.plants.find(
        plant => plant.name === state.plants.selectedPlantName);
    return {
        editing: state.plantsView.editing,
        filter: state.plants.filter,
        plants: state.plants.plants,
        selectedPlant: selectedPlant,
        sort: state.plants.sort
    };
};

const handleEditPlant = editing => {
    if (editing) {
        editPlant();
    } else {
        savePlant();
    }
};

const plantsViewContainer = props => (
    <PlantsViewPage
        editing={props.editing}
        filter={props.filter}
        onAddPlant={createPlant}
        onEdit={handleEditPlant}
        onUpdatePlant={updatePlant}
        plants={props.plants}
        selectedPlant={props.selectedPlant}
        sort={props.sort} />
);

plantsViewContainer.propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    editing: React.PropTypes.bool.isRequired,
    filter: React.PropTypes.func.isRequired,
    plants: React.PropTypes.object.isRequired,
    selectedPlan: React.PropTypes.object,
    sort: React.PropTypes.func.isRequired
};

export default connect(mapStateToProps)(plantsViewContainer);