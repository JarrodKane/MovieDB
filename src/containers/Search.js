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
      rqtoken: {},
      login: { un: "Harrod", pw: "15Mackdog$" }
    };

    this.createRequestToken = this.createRequestToken.bind(this);
    this.authReq = this.authReq.bind(this);
  }

  // Static prop set for API since it will never be changed by any event in the application
  static defaultProps = {
    api: "9ccbc3e0393b7578cbf2eb8ae9f260c0"
  };

  // This function will go create a request_token, which then gets stored in state.
  async createRequestToken() {
    const api = this.props.api;
    try {
      let rtData = {};

      let res = await axois.get(`authentication/token/new?api_key=${api}`);
      rtData = res.data;
      this.setState({ rqtoken: rtData });
      // console.log(this.state.rqtoken);
      this.authReq();
    } catch (e) {
      alert(e);
      this.setState({ loading: false });
    }
  }

  // This function will take the created request_token and authenticate it against a user
  async authReq() {
    const api = this.props.api;
    const { un, pw } = this.state.login;
    const rt = this.state.rqtoken.request_token;
    //  console.log(rt);

    var data = {
      username: un,
      password: pw,
      request_token: rt
    };

    try {
      let authData = {};

      let res = await axois.post(
        `authentication/token/validate_with_login?api_key=${api}`,
        data
      );
      authData = res.data;
      console.log("Author data ");
      console.log(authData);
      this.createSessionId();
    } catch (e) {
      alert(e);
      this.setState({ loading: false });
    }
  }

  //Taking the autenticated request_token we can now get a session ID for the user that has that token
  async createSessionId() {
    const api = this.props.api;
    const rt = this.state.rqtoken.request_token;
    console.log("request_token to be autneticated for sessionID");
    console.log(rt);
    var data = {
      request_token: rt
    };
    try {
      //let sessionData = {};

      let res = await axois.post(
        `authentication/session/new?api_key=${api}`,
        data
      );
      console.log("SessionDATA");
      console.log(res.data);
      //sessionData = this.state.login;

      // this.setState({ login: sessionData });
      // console.log(this.state.rqtoken);
    } catch (e) {
      alert(e);
      this.setState({ loading: false });
    }
  }

  /*
  subUserLogin() {
    //TODO: Grab username and pw from form
  }

  testUser = () => {
    console.log(this.state.login);
  };

  deleteSession() {}

  addOrRemove(id) {}
  */

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
        <button onClick={this.testUser}>test user</button>
        <button onClick={this.createRequestToken}>Click</button>
        <button onClick={this.authReq}>Submit Login</button>
        <SearchBar />
        <div>{rows}</div>
      </div>
    );
  }
}

export default Search;
