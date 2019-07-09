import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { setFields, requestToken, requestAccount } from "./reducers";

//Added redux logger in for debugging purposes
const logger = createLogger();
const rootReducer = combineReducers({
  setFields,
  requestToken,
  requestAccount
});
const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware, logger)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
serviceWorker.unregister();
