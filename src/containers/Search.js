import React from "react";

import MovieRow from "../components/MovieRow";
import SearchBar from "../components/SearchBar";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [
        { id: "213", title: "Hacker", add: false },
        { id: "243", title: "dingo", add: false }
      ],
      isSignedIn: false
    };
  }

  addOrRemove(id) {}

  render() {
    const rows = this.state.movies.map(row => (
      <MovieRow
        id={row.id}
        key={row.id}
        title={row.title}
        addOrRemove={row.add}
      />
    ));
    return (
      <div>
        <SearchBar />
        <div>{rows}</div>
      </div>
    );
  }
}

export default Search;
