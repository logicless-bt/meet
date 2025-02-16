import React from 'react'; 
import './App.css';
import EventList from './components/EventList.jsx';
import CitySearch from './components/CitySearch.jsx';

function App() {
  

  return (
    <div>
      <EventList />
      <CitySearch />
    </div>
  );
}

export default App;