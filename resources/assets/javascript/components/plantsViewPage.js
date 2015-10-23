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
                plants={props.plants}
                filterString={props.filterString}
                sortType={props.sortType} />
            {plantView}
        </div>
    );
};

plantsViewPage.propTypes = {
    editing: React.PropTypes.bool.isRequired,
    filter: React.PropTypes.func.isRequired,
    onAddPlant: React.PropTypes.func.isRequired,
    onEdit: React.PropTypes.func.isRequired,
    onUpdatePlant: React.PropTypes.func.isRequired,
    plants: React.PropTypes.object.isRequired,
    selectedPlant: React.PropTypes.object,
    sort: React.PropTypes.func.isRequired
};

export default plantsViewPage;