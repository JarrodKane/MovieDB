import React from "react";
import { connect } from "react-redux";
import "./Home.css";
// Components
import TVTable from "../components/TVTable";
import SearchBar from "../components/SearchBar";
import TVRow from "../components/TVRow";

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
    isSignedIn: state.requestAccount.isSignedIn,
    TVshows: state.requestTVShows.TVshows,
    watchList: state.requestWatchList.watchList,
    haveTV: state.requestWatchList.haveTV
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
    e.preventDefault(); //Preventing the form from rerendering the screen
    let data = {
      api: this.props.api,
      un: this.props.un,
      pw: this.props.pw,
      page: 1
    };
    this.props.onRequestToken(data); // Calling the onRequestToken and passing in the api key that was just grabbed
    this.props.onRequestTV(data);
  };

  // TODO: CHEKC THROUGH GIVEN ID TO THE WATCHLIST, IF IT IS NOT ON THE WATCHLIST RETURN A FALSE OTHERWISE A TRUE
  //NO need to make a call to check an individual tv show since we already have the watchlist
  // Compare TV shows and watchlist as soon as user is signed in once instead of multiple times
  checkShowVsWatchList = tv_id => {
    let tvShows = this.props.TVshows;
    console.log(tvShows);
    let data = {
      api: this.props.api,
      session_id: this.props.session_id,
      tv_id: tv_id
    };

    //this.props.onRequestState(data);
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

  //
  // -- RENDER --
  //
  render() {
    // Deconstructing the props to use easier
    const {
      onPWChange,
      onUNChange,
      onSearchChange,
      un,
      pw,
      isSignedIn,
      TVshows,
      haveTV
    } = this.props;

    //Conditional for displaying loader should be in the render to make it look better and not display any table etc
    //TODO: refactor into a function to call this section and drop into render
    let tvElements;
    if (TVshows.length === 0) {
      tvElements = <tr className="ui active inline centerd huge loader"></tr>;
    } else {
      tvElements = TVshows.results.map(show => (
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
          checkShowVsWatchList={this.checkShowVsWatchList}
          haveTV={haveTV}
        />
      ));
    }

    //TODO: Move login/search into its own component
    //TODO: Move the table into own componnet
    return (
      <div className="ui">
        <SearchBar
          un={un}
          pw={pw}
          search=""
          submitLogin={this.handleAuthenticate}
          onUNChange={onUNChange}
          onPWChange={onPWChange}
          onSearchChange=""
        />

        <div className="ui container">
          <TVTable tvElements={tvElements} />
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
