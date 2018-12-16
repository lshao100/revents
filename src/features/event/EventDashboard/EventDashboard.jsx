import React, { Component } from 'react';
import { Grid, Button } from 'semantic-ui-react';
import cuid from 'cuid';
import EventList from '../EventList/EventList';
import EventForm from '../EventForm/EventForm';

const eventsDashboard = [
  {
    id: '1',
    title: 'Trip to Tower of London',
    date: '2018-03-27',
    category: 'culture',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
    city: 'London, UK',
    venue: "Tower of London, St Katharine's & Wapping, London",
    hostedBy: 'Bob',
    hostPhotoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
    attendees: [
      {
        id: 'a',
        name: 'Bob',
        photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
      },
      {
        id: 'b',
        name: 'Tom',
        photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
      }
    ]
  },
  {
    id: '2',
    title: 'Trip to Punch and Judy Pub',
    date: '2018-03-28',
    category: 'drinks',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
    city: 'London, UK',
    venue: 'Punch & Judy, Henrietta Street, London, UK',
    hostedBy: 'Tom',
    hostPhotoURL: 'https://randomuser.me/api/portraits/men/22.jpg',
    attendees: [
      {
        id: 'b',
        name: 'Tom',
        photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
      },
      {
        id: 'a',
        name: 'Bob',
        photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
      }
    ]
  }
]


/*add constructor to deal stateful */
class EventDashboard extends Component {
  state={
      events:eventsDashboard,
      isOpen: false,
      selectedEvent:null        //select event to show (read operation)
  };
  handleFormOpen=()=>{
    this.setState({
      selectedEvent: null,   //read operation
      isOpen: true
    });
  };

  handleCancel=()=>{
    this.setState({
      isOpen: false
    });
  };

  //for update an existing event
  handleUpdateEvent = (updatedEvent) => {
    this.setState({
      events: this.state.events.map(event => {
        if(event.id === updatedEvent){
          return Object.assign({}, updatedEvent);
        }else {
          return event;
        }
      }),
      isOpen: false,
      selectedEvent: null
    })
  }

  //for read an existing event operation 
  handleOpenEvent = (eventToOpen) => () =>{
    this.setState({
      selectedEvent: eventToOpen,
      isOpen: true
    });
  };

 //controlled form function for input 
 //also add "createEvent={this.handleCreateEvent} to EventForm"
 //create an event
  handleCreateEvent = (newEvent) => {
    newEvent.id = cuid();
    newEvent.PhotoURL = '/assets/user.png';
    const updatedEvents = [...this.state.events, newEvent];
    this.setState({
      events: updatedEvents,
      isOpen: false
    });
  };

  //delete an event
  handleDeleteEvent = (eventId) => () => {
    const updatedEvents = this.state.events.filter(e=> e.id !==eventId);
    this.setState({
      events: updatedEvents
    })
  }

  render() {
    const {selectedEvent} = this.state;
    return (
      <Grid>
         <Grid.Column width={10}>
                  {/*update eventsDashboard  to this.state.event ,  read operation -> onEventOpen={this.handleOpenEvent} */}
            <EventList deleteEvent={this.handleDeleteEvent} onEventOpen={this.handleOpenEvent}  events={this.state.events}/>    
         </Grid.Column>
         
         <Grid.Column width={6}>
        
         <Button onClick={this.handleFormOpen} positive content='Create Event'/>
                  {/*add {this.state.isOpen &&  <EventForm ..../>}  to exchange <EventForm/> on static format */}
                  {/*add read operation -> selectedEvent={selectedEvent} to eventForm */}
                  {/*add update operation -> updateEvent={this.handleUpdateEvent} to eventForm */}
          {this.state.isOpen &&  (
          <EventForm updateEvent={this.handleUpdateEvent} selectedEvent={selectedEvent} createEvent={this.handleCreateEvent} handleCancel={this.handleCancel}/>
          )}
         </Grid.Column>
      </Grid>
    )
  }
}
export default EventDashboard 