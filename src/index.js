import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { install } from 'ga-gtag';
import trackingId from './lib/google-analytics';
import './main.css';
import App from './app/App';
import configureStore from './app/configureStore';
import * as serviceWorker from './serviceWorker';

install(trackingId());

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
