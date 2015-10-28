import PlantListItem from './plantListItem';
import PlantListSearchBox from './plantListSearchBox';
import React from 'react';
import SelectBox from './selectBox';

const alphabeticalSort = (first, second) => {
    if (first.name < second.name) {
        return -1;
    } else if (first.name > second.name) {
        return 1;
    }
    
    return 0;
};

const valueSort = (first, second) => {
    if (first.value < second.value) {
        return -1;
    } else if (first.value > second.value) {
        return 1;
    }
    
    return 0;
};

const SORT_TYPES = {
    alphabetical: {
        label: 'Sort by name',
        sort: alphabeticalSort
    },
    
    value: {
        label: 'Sort by value',
        sort: valueSort
    }
};

const filter = filterString => plant => {
    console.log(JSON.stringify(filterString));
    filterString = filterString.toUpperCase();
    return (plant.name.toUpperCase().indexOf(filterString) !== -1) ||
        (plant.label && (plant.label.toUpperCase().indexOf(filterString) !== -1));
};

const plantList = props => {
    const visiblePlants = props.plants.filter(plant =>
        props.visiblePlantNames.indexOf(plant.name) !== -1);
    
    const plantListItems = visiblePlants.map(
        plant => {
            let value;
            if (plant.value) {
                value = ' ($' + plant.value.toFixed(2) + ')';
            }
            
            return (
                <PlantListItem
                    detail={value}
                    key={plant.name}
                    name={plant.name}
                    onClick={props.onSelectPlant} />
            );
        }
    );
    
    const sortOptions = Object.getOwnPropertyNames(SORT_TYPES).
        map(sort => ({
            value: sort,
            label: SORT_TYPES[sort].label
        }));
    
    return (
        <div className="plantList">
            <PlantListSearchBox
                onChange={filterString => props.onFilterPlants(
                    filter(filterString)
                )} />
            <SelectBox
                onChange={sortType => props.onSortPlants(
                    SORT_TYPES[sortType].sort
                )}
                options={sortOptions} />
            <ol>
                {plantListItems}
            </ol>
        </div>
    );
};

plantList.propTypes = {
    onFilterPlants: React.PropTypes.func.isRequired,
    onSelectPlant: React.PropTypes.func.isRequired,
    onSortPlants: React.PropTypes.func.isRequired,
    plants: React.PropTypes.arrayOf(
        React.PropTypes.object).isRequired,
    visiblePlantNames: React.PropTypes.arrayOf(
        React.PropTypes.string).isRequired
};

export default plantList;