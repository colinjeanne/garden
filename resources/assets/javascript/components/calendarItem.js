import React from 'react';

const CalendarEventActions = props => {
    const delayButton = (
        <button
            onClick={() => props.onHarvestDelayed(props.calendarItem.id)}
            type="button">
            Delay This Harvest
        </button>
    );
    
    const deadButton = (
        <button
            onClick={() => props.onPlantDied(props.calendarItem.id)}
            type="button">
            This Plant Died
        </button>
    );
    
    return (!props.calendarItem.isDead) ? (
        <div className="actions">
            {delayButton}
            {deadButton}
        </div>
    ) : <div className="actions"></div>;
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

export default class CalendarItem extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            harvestAmount: 1
        };
    }
    
    static get propTypes() {
        return {
            calendarItem: React.PropTypes.object.isRequired,
            eventType: React.PropTypes.string.isRequired,
            onHarvestAdded: React.PropTypes.func.isRequired,
            onHarvestDelayed: React.PropTypes.func.isRequired,
            onPlantDied: React.PropTypes.func.isRequired,
            plant: React.PropTypes.object.isRequired
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
            this.props.onHarvestAdded(this.props.calendarItem.id, harvestAmount);
            this.setState({
                harvestAmount: 1
            });
        }
    }
    
    render() {
        const harvestAmount = this.props.calendarItem.harvests.reduce(
            (previousValue, currentValue) => previousValue + currentValue,
            0);
        
        const addHarvestElement = (!this.props.calendarItem.isDead) ? (
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
        ) : undefined;
        
        let harvestElement;
        if (harvestAmount > 0) {
            harvestElement = (
                <div className="harvest">
                    {harvestAmount.toFixed(2)} {this.props.plant.unit} harvested
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
        
        const className = (this.props.eventType === 'planted') ?
            'plantedItem' :
            'harvestItem';
        
        let mainLineClassName = 'mainLine';
        if (this.props.calendarItem.isDead) {
            mainLineClassName += ' deadItem';
        } else if (this.props.calendarItem.isDelayed) {
            mainLineClassName += ' delayedItem';
        }
        
        return (
            <li className={className}>
                <h2 className={mainLineClassName}>
                    <span className="name">{this.props.plant.name}</span>
                </h2>
                <div className="calendarEventInfo">
                    {harvestElement}
                    <PlantStatus
                        calendarItem={this.props.calendarItem} />
                    <CalendarEventActions
                        calendarItem={this.props.calendarItem}
                        onHarvestDelayed={this.props.onHarvestDelayed}
                        onPlantDied={this.props.onPlantDied} />
                </div>
            </li>
        );
    }
}