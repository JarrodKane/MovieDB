import React from "react";
import { connect } from "react-redux";
import SearchBar from "../components/SearchBar";
import TVRow from "../components/TVRow";
import "./Home.css";

//Importing redux actions
import {
  setUserNameField,
  setPasswordField,
  setSearchField,
  requestToken,
  requestTVShows,
  requestWatchList,
  requestAccountStates
} from "../actions";

//Mapping reduxProps
const mapStateToProps = state => {
  return {
    un: state.setFields.un,
    pw: state.setFields.pw,
    isPending: state.requestToken.isPending,
    error: state.requestToken.error,
    requestToken: state.requestToken.requestToken,
    session_id: state.requestToken.data.session_id,
    data: state.requestToken.data,
    api: state.requestToken.api,
    account: state.requestAccount.account,
    TVshows: state.requestTVShows.TVshows,
    watchList: state.requestWatchList.watchList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUNChange: event => dispatch(setUserNameField(event.target.value)),
    onPWChange: event => dispatch(setPasswordField(event.target.value)),
    onSearchChange: event => dispatch(setSearchField(event.target.value)),
    onRequestToken: data => dispatch(requestToken(data)),
    onRequestTV: data => dispatch(requestTVShows(data)),
    onRequestState: data => dispatch(requestAccountStates(data)),
    onRequestWatchList: data => dispatch(requestWatchList(data))
  };
};

class Home extends React.Component {
  constructor(props) {
    super(props);

    // Bound instead of using arrow functions for handle change, otherwise you create a new function each time the arrow change is called
    this.handleChange = this.handleChange.bind(this);
  }

  // Once the component mounts it will call an action to grab a list of the first page of popular tv shows
  // If to make sure it only grabs it if the TVshows prop is blank
  // TODO: Add signout to wipe TVShow props etc, s/ If to make sure it only grabs it if the TVshows prop is blanko that this will be called again
  componentDidMount() {
    if (this.props.TVshows.length === 0) {
      let data = {
        api: this.props.api,
        page: 1
      };
      this.props.onRequestTV(data);
    }
  }

  // This gets called when ever the input boxes are used
  // This sets the un if it was an username change or a pw if it was a password change with each change
  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  //This calls the action to autenticate the request_token with a users credentials
  handleAuthenticate = e => {
    let data = {
      api: this.props.api,
      un: this.props.un,
      pw: this.props.pw,
      page: 1
    };
    e.preventDefault(); //Preventing the form from rerendering the screen
    this.props.onRequestToken(data); // Calling the onRequestToken and passing in the api key that was just grabbed
    this.props.onRequestTV(data);
  };

  //This will get take the id from the event, passs it in with the users account, and either apply or remove it from the watchList
  handleClickAdd = e => {
    let tv_id = e.target.id;
    console.log(e.target.id);
  };

  //This handles checking the TV show state agains the users watchlist, gives back a function to either yes they have it, or no they don't
  //TODO: Check based on if user is signed in
  handleCheckWatchListVsTVshow = () => {
    const account = this.props.account;
    console.log("Called");
    if (account.length === 0) {
      return true;
    } else {
      return false;
      //Check if user has it, and set it to true or false
    }
  };

  // If the TV props does not exist it displays a loading, otherwise it will display the WatchList
  //TODO: Fix the loader , probabbly should have the conditional in the render to display loader not here

  handleTVShowsVSstate = () => {
    const TVshows = this.props.TVshows;
    const rTVListState = "";

    console.log("RESTAUTH");
    let data = {
      api: this.props.api,
      session_id: this.props.session_id
    };
  };

  render() {
    // Deconstructing the props to use easier
    const {
      onPWChange,
      onUNChange,
      onSearchChange,
      un,
      pw,
      session_id
    } = this.props;
    const TVshows = this.props.TVshows;
    let tvTable;
    let isSignedIn = this.handleCheckWatchListVsTVshow();

    //Conditional for displaying loader should be in the render to make it look better and not display any table etc
    if (TVshows.length === 0) {
      tvTable = <tr className="ui active inline centerd huge loader"></tr>;
    } else {
      //If signed in, compare the returned list to the watchlist, otherwise return false
      tvTable = TVshows.results.map(show => (
        <TVRow
          id={show.id}
          key={show.id}
          name={show.name}
          image={show.poster_path}
          year={show.first_air_date}
          rate={show.vote_average}
          lang={show.original_language}
          handleClickAdd={this.handleClickAdd}
          isSignedIn={isSignedIn}
        />
      ));
    }

    //TODO: RENENDER HERE WITH THE CHECK CALL TO SEE IF IT HAS BEEN ADDED TO THEIR LIST
    // CALL THEIR WATCHLIST AS SOON AS THEY SIGN IN TO MAKE IT EASIER

    return (
      <div className="ui bottomlayer">
        <form className="Username ui  menu" onSubmit={this.handleAuthenticate}>
          <div className="right item">
            <div className="ui icon  input icon">
              <input
                type="text"
                placeholder="Username"
                id="un"
                name="un"
                value={un}
                onChange={onUNChange}
              />
              <i aria-hidden="true" className="user icon"></i>
            </div>
          </div>

          <div className="right item">
            <div className="ui action input">
              <input
                type="password"
                placeholder="Password"
                id="pw"
                name="pw"
                value={pw}
                onChange={onPWChange}
              />
              <button className="ui button">Login</button>
            </div>
          </div>
        </form>

        <div className="ui container">
          <table className="ui celled padded table  ">
            <thead className="">
              <tr className="">
                <th className="ui medium header">Cover</th>
                <th className="ui medium header">Title</th>
                <th className="ui medium header">Year</th>
                <th className="ui medium header">Average</th>
                <th className="ui medium header">Language</th>
                <th className="ui medium header">Add/Remove</th>
              </tr>
            </thead>
            <tbody className="">{tvTable}</tbody>
            <tfoot className="">
              <tr className="">
                <th colSpan="6" className="">
                  <div className="ui pagination right floated menu">
                    <a className="icon item">
                      <i aria-hidden="true" className="chevron left icon"></i>
                    </a>
                    <a className="icon item">
                      <i aria-hidden="true" className="chevron right icon"></i>
                    </a>
                  </div>
                </th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
