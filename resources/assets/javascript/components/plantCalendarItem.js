import React from 'react';

export default class PlantCalendarItem extends React.Component {
    render() {
        let harvestElement;
        if ((this.props.amount !== undefined) &&
            (this.props.unit !== undefined)) {
            harvestElement = (
                <div className="harvest">
                   <span className="amount">{this.props.amount}</span>
                   <span className="unit">{this.props.unit}</span>
                   harvested
                </div>
            );
        }
        
        let isDelayedElement;
        if (this.props.isDelayed) {
            isDelayedElement = <span className="isDelayed">Delayed</span>;
        }
        
        let isDeadElement;
        if (this.props.isDead) {
            isDeadElement = <span className="isDead">Died</span>;
        }
        
        let delayButton;
        if (this.props.isEditable) {
            delayButton = <button type="button">Delay</button>;
        }
        
        return (
            <li className="plantCalendarItem">
                <div className="mainLine">
                    <span className="name"></span>
                    <span className="space"></span>
                </div>
                {harvestElement}
                {isDelayedElement}
                {isDeadElement}
                {delayButton}
            </li>
        );
    }
}
