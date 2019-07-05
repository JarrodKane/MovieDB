import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import { createStore } from "redux";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { setFields } from "./reducers";

const store = createStore(setFields);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
serviceWorker.unregister();
