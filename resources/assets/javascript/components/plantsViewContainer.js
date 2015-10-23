import { connect } from 'react-redux';
import { createPlant } from '../actions/plantActions';
import { editPlant, savePlant } from '../actions/navigationActions';
import PlantViewPage from './plantViewPage';
import React from 'react';

const mapStateToProps = state => {
    return {
        editing: state.plantsView.editing,
        filter: state.plants.filter,
        plants: state.plants.plants,
        selectedPlantName: state.plants.selectedPlantName,
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
        editing={this.props.editing}
        filter={this.props.filter}
        onAddPlant={createPlant}
        onEdit={handleEditPlant}
        plants={this.props.plants}
        selectedPlantName={this.props.selectedPlantName}
        sort={this.props.sort} />
);

plantsViewContainer.propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    editing: React.PropTypes.bool.isRequired,
    filter: React.PropTypes.func.isRequired,
    plants: React.PropTypes.object.isRequired,
    selectedPlantName: React.PropTypes.string,
    sort: React.PropTypes.func.isRequired
};

export default connect(mapStateToProps)(plantsViewContainer);