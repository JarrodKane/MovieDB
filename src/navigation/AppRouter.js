import React from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

import Home from "../containers/Home";
import WatchList from "../containers/WatchList";
import "../styles/Menu.css";

function AppRouter() {
  return (
    <Router basename="/MovieDB">
      <div className="">
        <nav className="ui  pointing secondary huge menu container menuCent">
          <NavLink
            className="navItem item"
            exact
            to="/"
            activeClassName="active"
          >
            Home
          </NavLink>

          <NavLink
            className="navItem item"
            to="/watch_list/"
            activeClassName="active"
          >
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
