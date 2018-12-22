import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button} from 'semantic-ui-react';
import EventList from '../EventList/EventList';
import { deleteEvent} from '../eventActions'

const mapState= (state) => ({
  events: state.events
});

const actions = {
  deleteEvent
}


/*add constructor to deal stateful */
class EventDashboard extends Component {
  //delete an event
  handleDeleteEvent = (eventId) => () => {
    this.props.deleteEvent(eventId);  // after apply actions
  };

  render() {
  // const {selectedEvent} = this.state; 
    const {events} = this.props;
    return (
      <Grid>
         <Grid.Column width={10}>
                  {/*update eventsDashboard  to events ,  read operation -> onEventOpen={this.handleOpenEvent} */}
            <EventList 
            deleteEvent={this.handleDeleteEvent} 
            
           // onEventOpen={this.handleOpenEvent}  
          
            events={events}/>    
         </Grid.Column>
         
         <Grid.Column width={6}>
      
         <Button onClick={this.handleFormOpen} positive content='Create Event'/>
                  {/*add {this.state.isOpen &&  <EventForm ..../>}  to exchange <EventForm/> on static format */}
                  {/*add read operation -> selectedEvent={selectedEvent} to eventForm */}
                  {/*add update operation -> updateEvent={this.handleUpdateEvent} to eventForm */}
        {/*  
          {this.state.isOpen &&  (
          <EventForm 
          updateEvent={this.handleUpdateEvent} 
          selectedEvent={selectedEvent} 
          createEvent={this.handleCreateEvent} 
          handleCancel={this.handleCancel}/>
          )}

          */}
         </Grid.Column>
      </Grid>
    )
  }
}
export default connect(mapState, actions)(EventDashboard)