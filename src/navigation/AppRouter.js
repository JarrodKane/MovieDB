import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from "react-router-dom";
import Home from "../containers/Home";
import WatchList from "../containers/WatchList";

function AppRouter() {
  return (
    <Router>
      <div>
        <nav className="ui  pointing secondary menu">
          <NavLink className=" item" exact to="/" activeClassName="active">
            Home
          </NavLink>

          <NavLink className=" item" to="/watch_list/" activeClassName="active">
            Watch List
          </NavLink>
        </nav>
        <Route as={NavLink} path="/" exact component={Home} />
        <Route as={NavLink} path="/watch_list/" component={WatchList} />
      </div>
    </Router>
  );
}

export default AppRouter;
