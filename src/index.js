import React from "react";
import ReactDOM from "react-dom";
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
// core components
import App from './App';
// core redux
import reducer from './store/reducers/reducers';
//css
import "./assets/css/material-dashboard-react.css?v=1.7.0";

// redux
const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducer, composeEnhances(
    applyMiddleware(thunk)
));

const app = (
  <Provider store={store}>
    <App />
  </Provider>
)



ReactDOM.render(app, document.getElementById("root")
);
