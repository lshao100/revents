import React, { Component } from 'react';
import EventListItem from './EventListItem';

//add "onEventOpen" for read operation, deleteEvent for delete operation
class EventList extends Component {
  render() {
    const {events,deleteEvent} = this.props;
    return (
      <div>
        {events.map((event) => (
            <EventListItem 
              key={event.id} 
              event={event}  
              deleteEvent={deleteEvent} 
            />
        ))}
    
      </div>
    )
  }
}

export default EventList