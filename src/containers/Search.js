import React from "react";
import axois from "../api/TheMovieDB";

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
      isSignedIn: false,
      rqtoken: { success: false, expires_at: "", request_token: "" }
    };

    this.createRequestToken = this.createRequestToken.bind(this);
    this.createSession = this.createSession.bind(this);
    this.createSessionWithLogin = this.createSessionWithLogin.bind(this);
    this.deleteSession = this.deleteSession.bind(this);
  }

  static defaultProps = {
    api: "9ccbc3e0393b7578cbf2eb8ae9f260c0"
  };

  createRequestToken() {
    const api = this.props.api;
    axois
      .get(`authentication/token/new?api_key=${api}`)
      .then(response => console.log(response.data))
      .catch(function(err) {
        console.log(err);
      });
  }

  createSession() {
    const api = this.props.api;

    axois.get(`authentication/session/new?api_key=${api}`).then(
      response => response.data,
      (err, result) => {
        console.log(result);
      }
    );
  }

  createSessionWithLogin(userName, password) {
    // const rt = this.state.token.request_token;
  }

  deleteSession() {}

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
        <button onClick={this.createRequestToken}>Click</button>
        <SearchBar />
        <div>{rows}</div>
      </div>
    );
  }
}

export default Search;
