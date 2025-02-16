import React from 'react'; 
import './App.css';
import EventList from './components/EventList.jsx';
import CitySearch from './components/CitySearch.jsx';
import NumberOfEvents from './components/NumberOfEvents.jsx';

function App() {
  

  return (
    <div>
      <EventList />
      <CitySearch />
      <NumberOfEvents />
    </div>
  );
}

export default App;