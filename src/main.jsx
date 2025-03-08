import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
//import * as atatus from 'atatus-spa';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
//atatus.config('57a8e02211894e6aa1b7f02473b932bd').install();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
serviceWorkerRegistration.register();
