import React from 'react';

const CalendarEventActions = props => {
    const delayButton = (
        <button
            onClick={() => props.onHarvestDelayed(props.calendarItem.id)}
            type="button">
            Delay This Harvest
        </button>
    );
    
    const deadButton = (!props.calendarItem.isDead) ? (
        <button
            onClick={() => props.onPlantDied(props.calendarItem.id)}
            type="button">
            This Plant Died
        </button>
    ) : undefined;
    
    return (
        <div className="actions">
            {delayButton}
            {deadButton}
        </div>
    );
};

const PlantStatus = props => {
    const delayedElement = (props.calendarItem.isDelayed) ? (
        <div>
            Harvest Delayed
        </div>
    ) : undefined;
    
    const deadElement = (props.calendarItem.isDead) ? (
        <div>
            Plant Died
        </div>
    ) : undefined;
    
    return (
        <div className="errors">
            {delayedElement}
            {deadElement}
        </div>
    );
};

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
            onHarvestAdded: React.PropTypes.func.isRequired,
            onHarvestDelayed: React.PropTypes.func.isRequired,
            onPlantDied: React.PropTypes.func.isRequired
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
            this.props.harvestAdded(this.props.calendarItem.id, harvestAmount);
            this.setState({
                harvestAmount: 1
            });
        }
    }
    
    render() {
        const plant = this.props.calendarItem.plant;
        const harvestAmount = this.props.calendarItem.harvests.reduce(
            (previousValue, currentValue) => previousValue + currentValue,
            0);
        
        const addHarvestElement = (
            <div className="addHarvest">
                <label>
                    Amount harvested
                    <input
                        max="1000"
                        min="0.01"
                        onChange={this.handleHarvestChange.bind(this)}
                        ref="harvestAmount"
                        step="0.01"
                        type="number"
                        value={this.state.harvestAmount} />
                </label>
                <button
                    onClick={this.handleAddHarvest.bind(this)}
                    type="button">
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
        
        return (
            <li className="plantCalendarItem">
                <section>
                    <div className="mainLine">
                        <span className="name">{plant.name}</span>
                    </div>
                    {harvestElement}
                    <PlantStatus
                        calendarItem={this.props.calendarItem} />
                    <CalendarEventActions
                        calendarItem={this.props.calendarItem}
                        onHarvestDelayed={this.props.onHarvestDelayed}
                        onPlantDied={this.props.onPlantDied} />
                </section>
            </li>
        );
    }
}
