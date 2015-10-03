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
                        calendarItem={item} />
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
