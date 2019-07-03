import React from "react";

import SearchContainer from "../components/SearchContainer";
import SearchBar from "../components/SearchBar";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { movies: [], isSignedIn: false };
  }
  render() {
    return (
      <div>
        <SearchBar />
        <SearchContainer />
      </div>
    );
  }
}

export default Search;
