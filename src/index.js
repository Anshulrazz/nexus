import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store from './store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';  // Add BrowserRouter here
import { PrimeReactProvider } from 'primereact/api';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <PrimeReactProvider>
    <Provider store={store}>
      <Router>  {/* Wrap your App with BrowserRouter */}
        <App />
      </Router>
    </Provider>
    </PrimeReactProvider>
  </React.StrictMode>
);
