import { render } from '@testing-library/react';
import React from 'react';
import App from '../App.jsx';





describe('<App /> component', () => {
  let AppDOM;
  beforeEach(() => {
    AppDOM = render(<App />).container.firstChild;
  })


  test('renders list of events', () => {
    expect(AppDOM.querySelector('#event-list')).toBeInTheDocument();
  });


  test('render CitySearch', () => {
    expect(AppDOM.querySelector('#city-search')).toBeInTheDocument();
  });

  test('render number of events', () => {
    expect(AppDOM.querySelector('#number-of-events')).toBeInTheDocument();
  });
  
});