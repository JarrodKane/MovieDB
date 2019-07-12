import React from "react";

import "./App.css";

import Header from "./components/Header";

class App extends React.Component {
  render() {
    return (
      <div className="ui ">
        <Header class="ui vertical center aligned segment" />
      </div>
    );
  }
}

export default App;
