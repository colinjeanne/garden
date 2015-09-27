import PlantCalendarItem from './plantCalendarItem';
import React from 'react';

export default class PlantCalendarList extends React.Component {
    static get propTypes() {
        return {
            calendarDate: React.PropTypes.string.isRequired,
        };
    }
    
    render() {
        let calendarItems = [].map(
            item => {
                return (
                    <PlantCalendarItem
                        key={item.plant.name}
                        name={item.plant.name}
                        amount={item.harvests.amount}
                        unit={item.plant.unit}
                        isDelayed={item.isDelayed}
                        isDead={item.isDead} />
                );
            }
        );
        
        return (
            <div>
                <header>{this.props.calendarDate}</header>
                <ol className="plantCalendarList">
                    {calendarItems}
                </ol>
            </div>
        );
    }
}
