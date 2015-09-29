import CalendarEventStore from '../stores/calendarStore';
import moment from 'moment';
import PlantCalendarItem from './plantCalendarItem';
import React from 'react';

export default class PlantCalendarList extends React.Component {
    static get propTypes() {
        return {
            calendarDate: React.PropTypes.string.isRequired,
        };
    }
    
    render() {
        const utcTime = moment.utc(this.props.calendarDate);
        const title = utcTime.format('MMMM, YYYY');
        const nextMonth = utcTime.
            add(1, 'months').toISOString();
        const calendarEvents = CalendarEventStore.getReadyBetween(
            this.props.calendarDate,
            nextMonth);
        
        let calendarItems = calendarEvents.map(
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
            <section>
                <header>{title}</header>
                <ol className="plantCalendarList">
                    {calendarItems}
                </ol>
            </section>
        );
    }
}
