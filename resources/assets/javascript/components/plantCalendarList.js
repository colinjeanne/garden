import PlantCalendarItem from './plantCalendarItem';
import React from 'react';

export default class PlantCalendarList extends React.Component {
    render() {
        let calendarItems = this.state.data.map(
            item => {
                return (
                    <PlantCalendarItem
                        key={item.name}
                        name={item.name}
                        space={item.space}
                        amount={item.amount}
                        unit={item.unit}
                        isDelayed={item.isDelayed}
                        isDead={item.isDead}
                        isEditable={item.isEditable} />
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
