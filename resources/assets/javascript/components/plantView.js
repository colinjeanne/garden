import EditableText from './editableText';
import PlantActions from '../actions/plantActions';
import PlantStore from '../stores/plantStore';
import React from 'react';

export default class PlantView extends React.Component {
    static get propTypes() {
        return {
            plantName: React.PropTypes.string.isRequired
        };
    }
    
    handleDifficultyChanged(event) {
        PlantActions.updatePlantDifficulty(
            this.props.plantName,
            event.target.valueAsNumber);
    }
    
    handleGrowTimeChanged(event) {
        PlantActions.updatePlantGrowTime(
            this.props.plantName,
            event.target.valueAsNumber);
    }
    
    handleLabelChanged(event) {
        PlantActions.updatePlantLabel(
            this.props.plantName,
            event.target.value);
    }
    
    handleNotesChanged(event) {
        PlantActions.updatePlantNotes(
            this.props.plantName,
            event.target.value);
    }
    
    handlePricePerUnitChanged(event) {
        PlantActions.updatePlantPricePerUnit(
            this.props.plantName,
            event.target.valueAsNumber);
    }
    
    handleRarityChanged(event) {
        PlantActions.updatePlantRarity(
            this.props.plantName,
            event.target.valueAsNumber);
    }
    
    handleTasteChanged(event) {
        PlantActions.updatePlantTaste(
            this.props.plantName,
            event.target.valueAsNumber);
    }
    
    handleUnitChanged(event) {
        PlantActions.updatePlantUnit(
            this.props.plantName,
            event.target.value);
    }
    
    handleUnitPerSquareFootChanged(event) {
        PlantActions.updatePlantUnitPerSquareFoot(
            this.props.plantName,
            event.target.valueAsNumber);
    }
    
    render() {
        const plant = PlantStore.getByName(this.props.plantName);
        
        return (
            <section className="plantView">
                <header>{plant.name}</header>
                <EditableText>
                    <div>
                        <label htmlFor="growTime">Growth Time</label>
                        <input
                            id="growTime"
                            type="number"
                            min="1"
                            max="12"
                            onChange={this.handleGrowTimeChanged.bind(this)}
                            value={plant.growTime} />
                        Months
                    </div>
                    <div>
                        <label htmlFor="unit">Unit</label>
                        <input
                            id="unit"
                            maxLength="20"
                            onChange={this.handleUnitChanged.bind(this)}
                            value={plant.unit} />
                    </div>
                    <div>
                        <label htmlFor="difficulty">Difficulty</label>
                        <input
                            id="difficulty"
                            type="number"
                            min="1"
                            max="5"
                            onChange={this.handleDifficultyChanged.bind(this)}
                            value={plant.difficulty} />
                    </div>
                    <div>
                        <label htmlFor="rarity">Rarity</label>
                        <input
                            id="rarity"
                            type="number"
                            min="1"
                            max="5"
                            onChange={this.handleRarityChanged.bind(this)}
                            value={plant.rarity} />
                    </div>
                    <div>
                        <label htmlFor="taste">Taste</label>
                        <input
                            id="taste"
                            type="number"
                            min="1"
                            max="5"
                            onChange={this.handleTasteChanged.bind(this)}
                            value={plant.taste} />
                    </div>
                    <div>
                        <label htmlFor="cost">Store Cost</label>
                        $<input
                            id="cost"
                            type="number"
                            min="0.01"
                            max="400.00"
                            step="0.01"
                            onChange={this.handlePricePerUnitChanged.bind(this)}
                            value={plant.pricePerUnit} />
                    </div>
                    <div>
                        <label htmlFor="yield">Yield Per Square Foot</label>
                        <input
                            id="yield"
                            type="number"
                            min="0.01"
                            max="100"
                            step="0.01"
                            onChange={this.handleUnitPerSquareFootChanged.bind(this)}
                            value={plant.unitPerSquareFoot} />
                    </div>
                    <div>
                        <label htmlFor="plantValue">Value</label>
                        $<output
                            id="plantValue">{plant.value.toFixed(2)}</output>
                    </div>
                    <div>
                        <label htmlFor="notes">Notes</label>
                        <textarea
                            id="notes"
                            cols="60"
                            rows="10"
                            maxLength="32000"
                            spellCheck
                            onChange={this.handleNotesChanged.bind(this)}
                            value={plant.notes} />
                    </div>
                    <div>
                        <label htmlFor="label">Label</label>
                        <input
                            id="label"
                            maxLength="50"
                            spellCheck
                            onChange={this.handleLabelChanged.bind(this)}
                            value={plant.label} />
                    </div>
                </EditableText>
            </section>
        );
    }
}
