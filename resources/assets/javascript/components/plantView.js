import EditableText from './editableText';
import moment from 'moment';
import React from 'react';

export default class PlantView extends React.Component {
    static get propTypes() {
        return {
            editing: React.PropTypes.bool.isRequired,
            onEdit: React.PropTypes.func.isRequired,
            onUpdatePlant: React.PropTypes.func.isRequire,
            plant: React.PropTypes.object.isRequired,
        };
    }
    
    handleDifficultyChanged(event) {
        this.props.onUpdatePlant(
            this.props.plant.name,
            { difficulty: event.target.valueAsNumber });
    }
    
    handleGrowTimeChanged(event) {
        this.props.onUpdatePlant(
            this.props.plant.name,
            { growTime: `P${event.target.valueAsNumber}M` });
    }
    
    handleHarvestTimeChanged(event) {
        this.props.onUpdatePlant(
            this.props.plant.name,
            { harvestTime: `P${event.target.valueAsNumber}M` });
    }
    
    handleLabelChanged(event) {
        this.props.onUpdatePlant(
            this.props.plant.name,
            { label: event.target.value });
    }
    
    handleNotesChanged(event) {
        this.props.onUpdatePlant(
            this.props.plant.name,
            { notes: event.target.value });
    }
    
    handlePricePerUnitChanged(event) {
        this.props.onUpdatePlant(
            this.props.plant.name,
            { pricePerUnit: event.target.valueAsNumber });
    }
    
    handleRarityChanged(event) {
        this.props.onUpdatePlant(
            this.props.plant.name,
            { rarity: event.target.valueAsNumber });
    }
    
    handleTasteChanged(event) {
        this.props.onUpdatePlant(
            this.props.plant.name,
            { taste: event.target.valueAsNumber });
    }
    
    handleUnitChanged(event) {
        this.props.onUpdatePlant(
            this.props.plant.name,
            { unit: event.target.value });
    }
    
    handleUnitPerSquareFootChanged(event) {
        this.props.onUpdatePlant(
            this.props.plant.name,
            { unitPerSquareFoot: event.target.valueAsNumber });
    }
    
    render() {
        const growTime = moment.
            duration(this.props.plant.growTime).asMonths();
        const harvestTime = moment.
            duration(this.props.plant.harvestTime).asMonths();
        
        return (
            <section className="plantView">
                <header>{this.props.plant.name}</header>
                <EditableText
                    editing={this.props.editing}
                    onChange={this.props.onEdit}>
                    <div>
                        <label htmlFor="growTime">Growth Time</label>
                        <input
                            id="growTime"
                            max="12"
                            min="1"
                            onChange={this.handleGrowTimeChanged.bind(this)}
                            type="number"
                            value={growTime} />
                        Months
                    </div>
                    <div>
                        <label htmlFor="harvestTime">Harvest Time</label>
                        <input
                            id="harvestTime"
                            max="12"
                            min="1"
                            onChange={this.handleHarvestTimeChanged.bind(this)}
                            type="number"
                            value={harvestTime} />
                        Months
                    </div>
                    <div>
                        <label htmlFor="unit">Unit</label>
                        <input
                            id="unit"
                            maxLength="20"
                            onChange={this.handleUnitChanged.bind(this)}
                            value={this.props.plant.unit} />
                    </div>
                    <div>
                        <label htmlFor="difficulty">Difficulty</label>
                        <input
                            id="difficulty"
                            max="5"
                            min="1"
                            onChange={this.handleDifficultyChanged.bind(this)}
                            type="number"
                            value={this.props.plant.difficulty} />
                    </div>
                    <div>
                        <label htmlFor="rarity">Rarity</label>
                        <input
                            id="rarity"
                            max="3"
                            min="1"
                            onChange={this.handleRarityChanged.bind(this)}
                            type="number"
                            value={this.props.plant.rarity} />
                    </div>
                    <div>
                        <label htmlFor="taste">Taste</label>
                        <input
                            id="taste"
                            max="5"
                            min="1"
                            onChange={this.handleTasteChanged.bind(this)}
                            type="number"
                            value={this.props.plant.taste} />
                    </div>
                    <div>
                        <label htmlFor="cost">Store Cost</label>
                        $<input
                            id="cost"
                            max="400.00"
                            min="0.01"
                            onChange={this.handlePricePerUnitChanged.bind(this)}
                            step="0.01"
                            type="number"
                            value={this.props.plant.pricePerUnit} />
                    </div>
                    <div>
                        <label htmlFor="yield">Yield Per Square Foot</label>
                        <input
                            id="yield"
                            max="100"
                            min="0.01"
                            onChange={this.handleUnitPerSquareFootChanged.bind(this)}
                            step="0.01"
                            type="number"
                            value={this.props.plant.unitPerSquareFoot} />
                    </div>
                    <div>
                        <label htmlFor="plantValue">Value</label>
                        $<output
                            id="plantValue">{this.props.plant.value.toFixed(2)}</output>
                    </div>
                    <div>
                        <label htmlFor="notes">Notes</label>
                        <textarea
                            cols="60"
                            id="notes"
                            maxLength="32000"
                            onChange={this.handleNotesChanged.bind(this)}
                            rows="10"
                            spellCheck
                            value={this.props.plant.notes} />
                    </div>
                    <div>
                        <label htmlFor="label">Label</label>
                        <input
                            id="label"
                            maxLength="50"
                            onChange={this.handleLabelChanged.bind(this)}
                            spellCheck
                            value={this.props.plant.label} />
                    </div>
                </EditableText>
            </section>
        );
    }
}