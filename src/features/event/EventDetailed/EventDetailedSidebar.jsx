import React from 'react';
import {Segment, List, Item, Label } from 'semantic-ui-react';

const EventDetailedSidebar = ({attendees}) =>{
    const isHost = false;
  return (
       <div>
          <Segment
            textAlign="center"
            style={{ border: 'none' }}
            attached="top"
            secondary
            inverted
            color="teal"
          >
            {attendees && attendees.length} {attendees && attendees.length === 1 ? 'Person' : 'People'} Going
          </Segment>
          <Segment attached>
            <List relaxed divided>
            {attendees && attendees.map((attendees)=> (
              <Item ley={attendees.id} style={{ position: 'relative' }}>
               {isHost  && 
                    <Label
                    style={{ position: 'absolute' }}
                    color="orange"
                    ribbon="right"
                    >
                    Host
                    </Label>
                }
                <Item.Image size="tiny" src={attendees.photoURL}/>
                <Item.Content verticalAlign="middle">
                  <Item.Header as="h3">
                    <a>{attendees.name}</a>
                  </Item.Header>
                </Item.Content>
              </Item>
            ))}

            </List>
          </Segment>
        </div>
  )
}

export default EventDetailedSidebar
