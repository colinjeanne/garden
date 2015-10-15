import CalendarActions from '../actions/calendarActions';
import React from 'react';

export default class PlantCalendarItem extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            harvestAmount: 1
        };
    }
    
    static get propTypes() {
        return {
            calendarItem: React.PropTypes.object.isRequired,
        };
    }
    
    handleHarvestChange(event) {
        this.setState({
            harvestAmount: event.target.valueAsNumber
        });
    }
    
    handleAddHarvest() {
        const harvestAmountElement = this.refs.harvestAmount;
        const harvestAmount = harvestAmountElement.valueAsNumber;
        if (isNaN(harvestAmount) || (harvestAmount === 0)) {
            harvestAmountElement.setCustomValidity(
                'Amount must be a number and greater than zero');
        } else {
            harvestAmountElement.setCustomValidity('');
        }
        
        if (harvestAmountElement.checkValidity()) {
            CalendarActions.addHarvest(
                this.props.calendarItem.id,
                harvestAmount);
            this.setState({
                harvestAmount: 1
            });
        }
    }
    
    handleDelayClicked() {
        CalendarActions.delayHarvest(this.props.calendarItem.id);
    }
    
    handlePlantDiedClicked() {
        CalendarActions.plantDied(this.props.calendarItem.id);
    }
    
    render() {
        const calendarItem = this.props.calendarItem;
        const plant = calendarItem.plant;
        const harvestAmount = calendarItem.harvests.reduce(
            (previousValue, currentValue) => previousValue + currentValue,
            0);
        
        const mainLineElement = (
            <div className="mainLine">
                <span className="name">{plant.name}</span>
            </div>
        );
        
        const addHarvestElement = (
            <div className="addHarvest">
                <label>
                    Amount harvested
                    <input
                        type="number"
                        max="1000"
                        min="0.01"
                        step="0.01"
                        value={this.state.harvestAmount}
                        ref="harvestAmount"
                        onChange={this.handleHarvestChange.bind(this)} />
                </label>
                <button
                    type="button"
                    onClick={this.handleAddHarvest.bind(this)}>
                    Add Harvest
                </button>
            </div>
        );
        
        let harvestElement;
        if (harvestAmount > 0) {
            harvestElement = (
                <div className="harvest">
                    {harvestAmount.toFixed(2)} {plant.unit} harvested
                    {addHarvestElement}
                </div>
            );
        } else {
            harvestElement = (
                <div className="harvest">
                    {addHarvestElement}
                </div>
            );
        }
        
        const delayedElement = (calendarItem.isDelayed) ? (
            <div>
                Harvest Delayed
            </div>
        ) : undefined;
        
        const deadElement = (calendarItem.isDead) ? (
            <div>
                Plant Died
            </div>
        ) : undefined;
        
        const errorsElement = (
            <div className="errors">
                {delayedElement}
                {deadElement}
            </div>
        );
        
        const delayButton = (
            <button
                type="button"
                onClick={this.handleDelayClicked.bind(this)}>
                Delay This Harvest
            </button>
        );
        
        const deadButton = (!calendarItem.isDead) ? (
            <button
                type="button"
                onClick={this.handlePlantDiedClicked.bind(this)}>
                This Plant Died
            </button>
        ) : undefined;
        
        const actionsElement = (
            <div className="actions">
                {delayButton}
                {deadButton}
            </div>
        );
        
        return (
            <li className="plantCalendarItem">
                <section>
                    {mainLineElement}
                    {harvestElement}
                    {errorsElement}
                    {actionsElement}
                </section>
            </li>
        );
    }
}
