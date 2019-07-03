import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Search from "../containers/Search";
import WatchList from "../containers/WatchList";

function AppRouter() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>

            <li>
              <Link to="/watch_list/">Watch List</Link>
            </li>
          </ul>
        </nav>
        <Route path="/" exact component={Search} />
        <Route path="/watch_list/" component={WatchList} />
      </div>
    </Router>
  );
}

export default AppRouter;
