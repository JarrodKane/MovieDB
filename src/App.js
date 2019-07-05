import React from "react";
import "./App.css";
//import { connect } from "react-redux";

import Header from "./components/Header";

class App extends React.Component {
  simpleAction = event => {
    this.props.simpleAction();
  };

  render() {
    return (
      <div className="App">
        <Header />
        <button onClick={this.simpleAction}>Test redux action</button>
        <pre>{JSON.stringify(this.props)}</pre>
      </div>
    );
  }
}

export default App;
