import React, { Component } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';

class EventForm extends Component {
  //controlled form function for input
  state ={
    event: {
      title:'',
      date: '',
      city: '',
      venue: '',
      hostedBy:''
    }
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
    this.props.createEvent(this.state.event) //for controlled form createEvent

  }
  render() {
    const {handleCancel} = this.props; 
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
                <Button onClick={handleCancel} type="button">Cancel</Button>
              </Form>
            </Segment>
    )
  }
}
export default EventForm