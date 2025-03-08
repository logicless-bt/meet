import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import EventList from './components/EventList.jsx';
import CitySearch from './components/CitySearch.jsx';
import NumberOfEvents from './components/NumberOfEvents.jsx';
import { extractLocations, getEvents } from './api';
import { InfoAlert, ErrorAlert, WarningAlert } from './components/Alert';

function App() {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [infoAlert, setInfoAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("");
  const [warningAlert, setWarningAlert] = useState("");
  
  const fetchData = async () => {
    const allEvents = await getEvents();
    
    const filteredEvents = currentCity === "See all cities" ?
      allEvents :
      allEvents.filter(event => event.location === currentCity)
    setEvents(filteredEvents.slice(0, currentNOE));
    setAllLocations(extractLocations(allEvents));
  }

  /*const handleCityChange = (city) => {
		setCurrentCity(city);
		filterEvents(city, eventCount);

		let filtered = events;
		if (city !== '') {
			filtered = events.filter((event) =>
				event.location.toUpperCase().includes(city.toUpperCase())
			);
		}
		setFilteredEvents(filtered.slice(0, eventCount));
	};*/

  useEffect(() => {
    if (navigator.onLine) {
      // set the warning alert message to an empty string ""
    } else {
      // set the warning alert message to a non-empty string
    }
    fetchData();
  }, [currentCity, currentNOE]);

  return (
    <div>
      {/*<div>
        <button
        onClick={test}>Test</button>
      </div>*/}
      <div className="alerts-container">
        {infoAlert.length ? <InfoAlert text={infoAlert}/> : null}
        {errorAlert.length ? <ErrorAlert text = {errorAlert}/> : null}
      </div>
      <CitySearch allLocations = {allLocations} 
      setCurrentCity={setCurrentCity} 
      setInfoAlert={setInfoAlert}/>
      <NumberOfEvents setCurrentNOE = {setCurrentNOE} 
      currentNOE = {currentNOE} setInfoAlert = {setInfoAlert} setErrorAlert={setErrorAlert}/>
      <EventList events = {events}/>
    </div>
  );
}

export default App;