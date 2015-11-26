import React from 'react';

const summaryItem = props => {
    const delayedElement = props.amountDelayed > 0 ? (
        <div>
            {props.amountDelayed} of {props.totalAmount} delayed
        </div>
    ) : undefined;
    
    const deadElement = props.amountDead > 0 ? (
        <div>
            {props.amountDead} of {props.totalAmount} died
        </div>
    ) : undefined;
    
    const plantsWord = props.totalAmount === 1 ? 'plant' : 'plants';
    const harvestedWord = props.harvested > 0 ?
        props.harvested.toFixed(2) :
        'Nothing';
    
    return (
        <li>
            <header className="mainLine">
                <span className="name">{props.plantName}</span>
            </header>
            <div className="calendarEventInfo">
                <div className="harvest">
                    {harvestedWord} {props.unit} harvested 
                    from {props.totalAmount} {plantsWord}
                </div>
                {deadElement}
                {delayedElement}
            </div>
        </li>
    );
};

summaryItem.propTypes = {
    amountDead: React.PropTypes.number.isRequired,
    amountDelayed: React.PropTypes.number.isRequired,
    harvested: React.PropTypes.number.isRequired,
    plantName: React.PropTypes.string.isRequired,
    totalAmount: React.PropTypes.number.isRequired,
    unit: React.PropTypes.string
};

export default summaryItem;