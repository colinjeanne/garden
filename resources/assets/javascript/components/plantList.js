import Constants from '../constants/constants';
import PlantListItem from './plantListItem';
import PlantListSearchBox from './plantListSearchBox';
import PlantListSortBox from './plantListSortBox';
import React from 'react';

export default class PlantList extends React.Component {
    static get propTypes() {
        return {
            plants: React.PropTypes.any.isRequired,
            filterString: React.PropTypes.string.isRequired,
            sortType: React.PropTypes.string.isRequired
        };
    }
    
    render() {
        const allPlants = Array.from(this.props.plants.keys())
            .map(plantName => this.props.plants.get(plantName));
        
        const sortedPlantListItems = allPlants
            .sort((plantA, plantB) => {
                if (this.props.sortType === Constants.SORT_TYPE_ALPHABETICAL) {
                    if (plantA.name < plantB.name) {
                        return -1;
                    } else if (plantA.name > plantB.name) {
                        return 1;
                    }
                    
                    return 0;
                } else if (this.props.sortType === Constants.SORT_TYPE_VALUE) {
                    if (plantA.value < plantB.value) {
                        return 1;
                    } else if (plantA.value > plantB.value) {
                        return -1;
                    }
                    
                    return 0;
                }
            });
        
        const filteredPlantListItems = sortedPlantListItems
            .filter(plant => {
                const filterString = this.props.filterString.toUpperCase();
                return (plant.name.toUpperCase().indexOf(filterString) !== -1) ||
                    (plant.label && (plant.label.toUpperCase().indexOf(filterString) !== -1));
            });
        
        const plantListItems = filteredPlantListItems.map(
            plant => {
                let value;
                if (plant.value) {
                    value = ' ($' + plant.value.toFixed(2) + ')';
                }
                
                return (
                    <PlantListItem
                        key={plant.name}
                        name={plant.name}
                        detail={value} />
                );
            }
        );
        
        return (
            <div className="plantList">
                <PlantListSearchBox />
                <PlantListSortBox />
                <ol>
                    {plantListItems}
                </ol>
            </div>
        );
    }
}
