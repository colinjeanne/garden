import PlantListItem from './plantListItem';
import PlantListSearchBox from './plantListSearchBox';
import PlantListSortBox from './plantListSortBox';
import React from 'react';

export default class PlantList extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            searchString: '',
            sortType: 'alphabetical'
        };
    }
    
    static get propTypes() {
        return {
            plants: React.PropTypes.any.isRequired,
            onSelect: React.PropTypes.func.isRequired
        };
    }
    
    handleSearchStringChange(searchString) {
        this.setState({
            searchString: searchString
        });
    }
    
    handleSortTypeChange(sortType) {
        this.setState({
            sortType: sortType
        });
    }
    
    render() {
        const allPlants = Array.from(this.props.plants.keys())
            .map(plantName => this.props.plants.get(plantName));
        
        const sortedPlantListItems = allPlants
            .sort((plantA, plantB) => {
                if (this.state.sortType === 'alphabetical') {
                    if (plantA.name < plantB.name) {
                        return -1;
                    } else if (plantA.name > plantB.name) {
                        return 1;
                    }
                    
                    return 0;
                } else if (this.state.sortType === 'value') {
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
                const searchString = this.state.searchString.toUpperCase();
                return (plant.name.toUpperCase().indexOf(searchString) !== -1) ||
                    (plant.label && (plant.label.toUpperCase().indexOf(searchString) !== -1));
            });
        
        const plantListItems = filteredPlantListItems.map(
            plant => {
                const handleClick = () => this.props.onSelect(plant);
                
                let value;
                if (plant.value) {
                    value = ' ($' + plant.value.toFixed(2) + ')';
                }
                
                return (
                    <PlantListItem
                        key={plant.name}
                        name={plant.name}
                        detail={value}
                        onClick={handleClick} />
                );
            }
        );
        
        return (
            <div className="plantList">
                <PlantListSearchBox
                    onChange={this.handleSearchStringChange.bind(this)} />
                <PlantListSortBox
                    onChange={this.handleSortTypeChange.bind(this)} />
                <ol>
                    {plantListItems}
                </ol>
            </div>
        );
    }
}
