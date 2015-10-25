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
    filterString = this.props.filterString.toUpperCase();
    return plant.name.toUpperCase().includes(filterString) ||
        (plant.label && (plant.label.toUpperCase().includes(filterString)));
};

const plantList = props => {
    const visiblePlants = this.props.plants.filter(plant =>
        this.props.visiblePlantNames.includes(plant.name));
    
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
                    onClick={this.props.onSelectPlant} />
            );
        }
    );
    
    const sortOptions = Object.getOwnPropertyNames(SORT_TYPES).
        map(sort => ({
            value: sort.label,
            label: SORT_TYPES[sort].sort
        }));
    
    return (
        <div className="plantList">
            <PlantListSearchBox
                onChange={filterString => this.onFilterPlants(
                    filter(filterString)
                )} />
            <SelectBox
                onChange={sortType => this.onSortPlants(
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