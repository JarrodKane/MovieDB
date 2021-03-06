import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
//SEMANTIC-UI-REACT for css and some compoennts
//import "semantic-ui-css/semantic.min.css";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
//import { createLogger } from "redux-logger";

import thunkMiddleware from "redux-thunk";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import {
  setFields,
  requestToken,
  requestAccount,
  requestTVShows,
  requestWatchList,
  requestAccountStates,
  requestAddOrRemoves,
  addOrDelete
} from "./state/reducers";

//Added redux logger in for debugging purposes
//const logger = createLogger();
const appReducer = combineReducers({
  setFields,
  requestToken,
  requestAccount,
  requestTVShows,
  requestWatchList,
  requestAccountStates,
  requestAddOrRemoves,
  addOrDelete
});
const rootReducer = (state, action) => {
  if (action.type === "USER_LOGOUT") {
    state = undefined;
  }
  return appReducer(state, action);
};
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
serviceWorker.unregister();
