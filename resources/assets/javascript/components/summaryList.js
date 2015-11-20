import React from 'react';
import SummaryItem from './summaryItem';

const sum = items =>
    items.reduce((current, item) => current + item, 0);

const aggregateEvents = (events, plants) =>
    events.reduce((aggregated, event) => {
        const aggregatedEvent = aggregated.find(element =>
            element.plantName === event.plantName);
        if (aggregatedEvent) {
            ++aggregatedEvent.totalAmount;
            aggregatedEvent.harvested += sum(event.harvests);
            
            if (event.isDead) {
                ++aggregatedEvent.amountDead;
            }
            
            if (event.isDelayed) {
                ++aggregatedEvent.amountDelayed;
            }
        } else {
            const plant = plants.find(plant => plant.name === event.plantName);
            aggregated.push({
                amountDead: event.isDead ? 1 : 0,
                amountDelayed: event.isDelayed ? 1 : 0,
                harvested: sum(event.harvests),
                totalAmount: 1,
                plantName: event.plantName,
                unit: plant.unit
            });
        }
        
        return aggregated;
    }, []);

const summaryList = props => {
    const aggregatedEvents = aggregateEvents(
        props.calendarEvents,
        props.plants);
    const calendarItems = aggregatedEvents.map(
        item => (
            <SummaryItem
                {...item}
                key={item.plantName} />
        )
    );
    
    return (
        <ol className="plantSummaryList">
            {calendarItems}
        </ol>
    );
};

summaryList.propTypes = {
    calendarEvents: React.PropTypes.array.isRequired,
    plants: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
};

export default summaryList;