import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createPlant, updatePlant } from '../actions/plantActions';
import { 
    editPlant,
    filterPlants,
    savePlant,
    selectPlant,
    sortPlants } from '../actions/navigationActions';
import PlantsViewPage from './plantsViewPage';
import React from 'react';

const mapStateToProps = state => {
    const selectedPlant = state.plants.plants.find(
        plant => plant.name === state.plants.selectedPlantName);
    return {
        editing: state.plantsView.editing,
        plants: state.plants.plants,
        selectedPlant: selectedPlant,
        visiblePlantNames: state.plants.visibleByName
    };
};

const handleEditPlant = editing => {
    if (editing) {
        return editPlant();
    }
    
    return savePlant();
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        onAddPlant: createPlant,
        onEdit: handleEditPlant,
        onFilterPlants: filterPlants,
        onSelectPlant: selectPlant,
        onSortPlants: sortPlants,
        onUpdatePlant: updatePlant
    },
    dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(PlantsViewPage);