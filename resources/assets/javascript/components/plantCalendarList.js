import PlantCalendarItem from './plantCalendarItem';
import React from 'react';

export default class PlantCalendarList extends React.Component {
    static get propTypes() {
        return {
            calendarEvents: React.PropTypes.array.isRequired,
        };
    }
    
    render() {
        const calendarItems = this.props.calendarEvents.map(
            item => {
                return (
                    <PlantCalendarItem
                        key={item.id}
                        name={item.plant.name}
                        amount={item.harvests.amount}
                        unit={item.plant.unit}
                        isDelayed={item.isDelayed}
                        isDead={item.isDead} />
                );
            }
        );
        
        return (
            <ol className="plantCalendarList">
                {calendarItems}
            </ol>
        );
    }
}
