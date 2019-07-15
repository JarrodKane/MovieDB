import React from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import Home from "../containers/Home";
import WatchList from "../containers/WatchList";

function AppRouter() {
  return (
    <Router basename="/MovieDB">
      <div>
        <nav className="ui  pointing secondary menu container ">
          <NavLink className=" item" to="/" activeClassName="active">
            Home
          </NavLink>

          <NavLink className=" item" to="/watch_list/" activeClassName="active">
            Watch List
          </NavLink>
        </nav>
        <Route as={NavLink} exact path="/" component={Home} />
        <Route as={NavLink} path="/watch_list/" component={WatchList} />
      </div>
    </Router>
  );
}

export default AppRouter;
