import React, { useState } from 'react';



const Event = ({ event }) => {
  const [visible, setVisible] = useState(false);
  const date = new Date(event.created).toISOString().split('T')[0];

  return (
    <li>
      <h2 id="title">{event.summary}</h2>
      <h3>Starts:</h3>
      <h3 id="start-time">{date}</h3>
      <h3>Takes Place At: </h3>
      <h3 id="location">{event.location}</h3>
      {visible ? (
        <div>
          <h5 id="description" data-testid="description">Details: </h5>
          <h5>{event.description}</h5>
          <h5 id="details">Organizer: </h5>
          <h5>{event.organizer.email}</h5>
          <button id="hide-details" onClick={() => setVisible(false)}>Hide Details</button>
        </div>
      ) : (
        <button id="show-details" onClick={() => setVisible(true)}>Show Details</button>
      )}
      
    </li>
  );
}


export default Event;