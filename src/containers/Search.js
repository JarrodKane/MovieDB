import React from "react";
import { connect } from "react-redux";
//import MovieRow from "../components/MovieRow";
import SearchBar from "../components/SearchBar";

import { createRequestToken, getAccDet } from "../api/OAuth";
import { getWatchList } from "../api/UserFun";

//Importing redux actions
import {
  setUserNameField,
  setPasswordField,
  setSearchField,
  requestToken
} from "../actions";

//Mapping reduxProps
const mapStateToProps = state => {
  return {
    api: state.requestToken.api,
    un: state.setFields.un,
    pw: state.setFields.pw,
    isPending: state.requestToken.isPending,
    error: state.requestToken.error,
    requestToken: state.requestToken.requestToken
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSearchChange: event => dispatch(setUserNameField(event.target.value)),
    onRequestToken: api => dispatch(requestToken(api))
  };
};

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [
        { id: "213", title: "Hacker", add: false },
        { id: "243", title: "dingo", add: false }
      ],
      isSignedIn: false,
      pw: "15Mackdog$",
      login_session: {},
      userDetails: {},
      watchList: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleAuthenticate = this.handleAuthenticate.bind(this);
    this.handleGetWatchlist = this.handleGetWatchlist.bind(this);
  }

  // This gets called when ever the input boxes are used
  // This sets the un if it was an username change or a pw if it was a password change with each change
  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  // --- This is the main call tothe OAuth Function ---
  // This function will go create a request_token, which then gets stored in state.
  // It will then call the getAccDet to get the details of the user account
  // The user detailss are then returned and stored in the state
  /*
  async handleAuthenticate(evt) {
    evt.preventDefault();
    const api = this.props.api;
    let { un, pw } = this.state;
    try {
      let userAuth = await createRequestToken(api, un, pw);
      this.setState({ login_session: userAuth });
      let session_id = this.state.login_session.session_id;

      let userDetails = await getAccDet(api, session_id);
      this.setState({ userDetails: userDetails });
    } catch (error) {}
  }
*/
  handleAuthenticate(e) {
    //Grab the api key from props
    const api = this.props.api;
    //Preventing the form from rerendering the screen
    e.preventDefault();
    // Calling the onRequestToken and passing in the api key that was just grabbed
    this.props.onRequestToken(api);
  }

  //Gets the watchlist for the authenticated user if not singed in asks for sign in
  // Makes an object of props to hand in
  //const { userID, sort, session_id, language, page, api } = props;
  //TODO: Change sort and page so we can pass as props
  async handleGetWatchlist() {
    // let props = this.state.userDetails;
    let details = this.state.userDetails;
    let props = {
      sort: "created_at.asc",
      page: "1",
      userDetails: { details },
      api: this.props.api,
      session_id: this.state.login_session.session_id
    };
    let watchList = await getWatchList(props);
    this.setState({ watchList: watchList });
  }

  render() {
    const { un, pw } = this.state;
    const { onSearchChange } = this.props;
    /*const rows = this.state.movies.map(row => (
      <MovieRow
        id={row.id}
        key={row.id}
        title={row.title}
        addOrRemove={row.add}
      />
    ));
    */
    return (
      <div>
        <form className="Username" onSubmit={this.handleAuthenticate}>
          <div>
            <label htmlFor="un">User name</label>
            <input
              type="text"
              placeholder="Username"
              id="un"
              name="un"
              value={this.state.un}
              onChange={onSearchChange}
            />
          </div>
          <div>
            <label htmlFor="pw">Password</label>
            <input
              type="password"
              id="pw"
              name="pw"
              value={this.state.pw}
              onChange={this.handleChange}
            />
          </div>

          <button>Click</button>
        </form>
        <button onClick={this.handleGetWatchlist}>CLICK ME</button>
        <SearchBar />
        <div>{un}</div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
