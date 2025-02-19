import React from 'react'; 
import { useState, useEffect } from 'react';
import './App.css';
import EventList from './components/EventList.jsx';
import CitySearch from './components/CitySearch.jsx';
import NumberOfEvents from './components/NumberOfEvents.jsx';
import { extractLocations, getEvents } from './api';

function App() {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [errorNotif, setErrorNotif] = useState("");

  const fetchData = async () => {
    const allEvents = await getEvents();
    const filteredEvents = currentCity === "See all cities" ?
      allEvents :
      allEvents.filter(event => event.location === currentCity)
    setEvents(filteredEvents.slice(0, currentNOE));
    setAllLocations(extractLocations(allEvents));
  }

  useEffect(() => {
    fetchData();
  }, [currentCity, currentNOE]);

  return (
    <div>
      <CitySearch allLocations = {allLocations} setCurrentCity={setCurrentCity}/>
      <NumberOfEvents setCurrentNOE = {setCurrentNOE} currentNOE = {currentNOE} setErrorNotif = {setErrorNotif}/>
      <EventList events = {events}/>
    </div>
  );
}

export default App;