import PlantList from './plantList';
import PlantListAddBox from './plantListAddBox';
import PlantView from './plantView';
import React from 'react';

const plantsViewPage = props => {
    let plantView;
    if (props.selectedPlantName) {
        plantView = (
            <PlantView
                plantName={props.selectedPlantName}
                editing={props.editing}
                onEdit={props.onEdit} />
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
    plants: React.PropTypes.object.isRequired,
    selectedPlantName: React.PropTypes.string,
    sort: React.PropTypes.func.isRequired
};

export default plantsViewPage;