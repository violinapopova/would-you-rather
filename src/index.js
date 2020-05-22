import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/App";
import reducer from "./reducers";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import { loadingBarMiddleware } from "react-redux-loading-bar";
import { Provider } from "react-redux";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk, loadingBarMiddleware()))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
