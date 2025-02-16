import React, { useState } from 'react';



const Event = ({ event }) => {
  const [visible, setVisible] = useState(false);
  return (
    <li>
      <h2 id="title">{event.summary}</h2>
      <h3>Starts:</h3>
      <h3 id="start-time">{event.created}</h3>
      <h3>Takes Place At: </h3>
      <h3 id="location">{event.location}</h3>
      {visible ? (
        <div>
          <h5 id="description">Details: </h5>
          <h5>{event.description}</h5>
          <h5 id="contact">Organizer: </h5>
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