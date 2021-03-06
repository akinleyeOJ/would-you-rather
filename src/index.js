import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from "react-redux";
import reducer from "./reducers";
import middleware from "./middleware";
import { createStore} from "redux";


import "semantic-ui-css/semantic.min.css";


const store = createStore(reducer, middleware);

ReactDOM.render(
  <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  </React.StrictMode>,
   document.getElementById("root")
);


