import React, { Component } from 'react';
import { connect } from 'react-redux';
import cuid from 'cuid';
import { Segment, Form, Button } from 'semantic-ui-react';
import {createEvent, updateEvent} from '../eventActions'

//access from store
const mapState = (state, ownProps) => {
  const eventId = ownProps.match.params.id;

  let event = {
    title: '',
    date: '',
    city: '',
    venue: '',
    hostedBy: ''
  }

  if(eventId && state.events.length > 0){
    event = state.events.filter(event => event.id === eventId)[0];
  }

  return {
    event
  }
}


//get from reducer
const actions = {
  createEvent,
  updateEvent
}

class EventForm extends Component {
  //controlled form function for input
  state ={
    event: Object.assign({}, this.props.event)   // emptyEvent
  }
  
  
  onInputChange = (evt) => {
    const newEvent = this.state.event;
    newEvent[evt.target.name] = evt.target.value
    this.setState({
      event:newEvent
    })
  }
  //uncontrolled form
  onFormSubmit = (evt)=> {
    evt.preventDefault();
    //console.log(this.state.event);  // for controlled form, "this.refs.title.value" change to  "this.state.event"
    if(this.state.event.id){       //check event id
      this.props.updateEvent(this.state.event);    // update an exist event
      this.props.history.goBack()
    }else{
      const newEvent= {
        ...this.state.event,
        id: cuid(),
        hostPhotoURL: '/assets/user.png'
      }
      this.props.createEvent(newEvent)      //for controlled form createEvent
      this.props.history.push('/events')
    }
  }
  render() { 
    const {event} = this.state;   //controlled form function for input 
    //name='title' onChange={this.onInputChange} value={event.title} for each input field
    return (
            <Segment>
              <Form onSubmit={this.onFormSubmit}>
                <Form.Field>
                  <label>Event Title</label>
                  <input name='title' onChange={this.onInputChange} value={event.title} placeholder="Event Title" />
                </Form.Field>
                <Form.Field>
                  <label>Event Date</label>
                  <input type="date" name='date' onChange={this.onInputChange} value={event.date} placeholder="Event Date" />
                </Form.Field>
                <Form.Field>
                  <label>City</label>
                  <input name='city' onChange={this.onInputChange} value={event.city} placeholder="City event is taking place" />
                </Form.Field>
                <Form.Field>
                  <label>Venue</label>
                  <input name='venue' onChange={this.onInputChange} value={event.venue} placeholder="Enter the Venue of the event" />
                </Form.Field>
                <Form.Field>
                  <label>Hosted By</label>
                  <input name='hostedBy' onChange={this.onInputChange} value={event.hostedBy} placeholder="Enter the name of person hosting" />
                </Form.Field>
                <Button positive type="submit">
                  Submit
                </Button>
                <Button onClick={this.props.history.goBack} type="button">Cancel</Button>
              </Form>
            </Segment>
    )
  }
}
export default connect(mapState, actions)(EventForm)