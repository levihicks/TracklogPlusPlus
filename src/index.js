import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';

// Axios Defaults
axios.defaults.baseURL = "https://ws.audioscrobbler.com/2.0";

// Axios Interceptors
axios.interceptors.request.use(request => {
    request.url += "&api_key=57ee3318536b23ee81d6b27e36997cde&format=json";
    return request;
});

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
