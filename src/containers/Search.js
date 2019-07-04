import React from "react";
import axois from "../api/TheMovieDB";

import MovieRow from "../components/MovieRow";
import SearchBar from "../components/SearchBar";

import { createRequestToken } from "../api/OAuth";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [
        { id: "213", title: "Hacker", add: false },
        { id: "243", title: "dingo", add: false }
      ],
      isSignedIn: false,
      login: { un: "Harrod", pw: "15Mackdog$" },
      login_session: {}
    };

    this.clickAuthenticate = this.clickAuthenticate.bind(this);
    this.getAccDet = this.getAccDet.bind(this);
  }

  // Static prop set for API since it will never be changed by any event in the application
  static defaultProps = {
    api: "9ccbc3e0393b7578cbf2eb8ae9f260c0"
  };

  // This function will go create a request_token, which then gets stored in state.
  async clickAuthenticate() {
    const api = this.props.api;
    let { un, pw } = this.state.login;
    try {
      let userAuth = await createRequestToken(api, un, pw);
      this.setState({ login_session: userAuth });
    } catch (error) {}
  }

  //Getting account details so that we can use the ID of the account to grab the wathclist and other calls
  async getAccDet() {
    const api = this.props.api;
    const session_id = this.state.session_id;
    let userDeets = [];

    try {
      let res = await axois.get(
        `/account?api_key=${api}&session_id=${session_id}`
      );
      userDeets = res.data;
      this.setState({ userDeets });
      this.getWatchList();
    } catch (e) {
      alert(e);
      this.setState({ loading: false });
    }
  }

  // Only returns 10 per page
  async getWatchList(sort = "created_at.asc", page = 1) {
    const userID = this.state.userDeets.id;
    const api = this.props.api;
    const session_id = this.state.session_id;
    const language = "en-US";
    let sort_by = sort;
    let pageNum = page;

    try {
      let res = await axois.get(
        `account/${userID}/watchlist/movies?api_key=${api}&language=${language}&session_id=${session_id}&sort_by=${sort_by}&page=${pageNum}`
      );
      console.log("Watch List");
      console.log(res.data);
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

  addOrRemove(id) {}
  */

  //TODO: Need a form to fill in for login if not logged in
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
        <button onClick={this.clickAuthenticate}>Click</button>
        <SearchBar />
        <div>{rows}</div>
      </div>
    );
  }
}

export default Search;
