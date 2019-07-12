import React from "react";
import { connect } from "react-redux";
import TvShowWatchList from "../components/TvShowWatchList";
import "./WatchList.css";
import SearchBar from "../components/SearchBar";

//Importing redux actions
import {
  setUserNameField,
  setPasswordField,
  setSearchField,
  requestToken,
  requestTVShows,
  requestWatchList
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
    watchList: state.requestWatchList.watchList,
    isSignedIn: state.requestAccount.isSignedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUNChange: event => dispatch(setUserNameField(event.target.value)),
    onPWChange: event => dispatch(setPasswordField(event.target.value)),
    onSearchChange: event => dispatch(setSearchField(event.target.value)),
    onRequestToken: data => dispatch(requestToken(data)),
    onRequestTV: data => dispatch(requestTVShows(data)),
    onRequestWatchList: data => dispatch(requestWatchList(data))
  };
};

class Home extends React.Component {
  // Once the component mounts it will call an action to grab a list of the first page of popular tv shows
  //Checks if user details are there otherwise just returns a recomended movie, and suggestion to sign in
  //TODO: show a random movie if not signed in

  //If a user now logs in, it will make the call for the users watchlist
  /* componentDidUpdate() {
    let data = {
      api: this.props.api,
      page: 1
    };
    // this.props.onRequestTV(data);
  }
  */

  componentDidMount() {
    const { isSignedIn } = this.props;

    if (!isSignedIn) {
    } else {
      this.handleGetWatchList();
    }
  }

  handleAuthenticate = e => {
    e.preventDefault(); //Preventing the form from rerendering the screen
    let data = {
      api: this.props.api,
      un: this.props.un,
      pw: this.props.pw,
      page: 1
    };
    this.props.onRequestToken(data); // Calling the onRequestToken and passing in the api key that was just grabbed
  };

  handleGetWatchList() {
    const { api, session_id, page = 1, sort = "created_at.asc" } = this.props;
    const { id, iso_639_1 } = this.props.account;

    const data = {
      api: api,
      session_id: session_id,
      id: id,
      sort: sort,
      page: page,
      iso_639_1: iso_639_1
    };
    this.props.onRequestWatchList(data);
  }

  render() {
    // Deconstructing the props to use easier
    const {
      onPWChange,
      onUNChange,
      onSearchChange,
      un,
      pw,
      watchList,
      isSignedIn
    } = this.props;

    let watchlistTable;
    if (isSignedIn) {
      console.log("They are signed in");
      if (watchList.length === 0) {
        this.handleGetWatchList();
      } else {
        console.log(watchList.results);
        watchlistTable = watchList.results.map(show => (
          <TvShowWatchList
            id={show.id}
            key={show.id}
            name={show.name}
            image={show.poster_path}
            year={show.first_air_date}
            rate={show.vote_average}
            lang={show.original_language}
          />
        ));
      }
    } else {
      console.log("REACHERD");
      watchlistTable = (
        <div>
          <div className="ui red message header">
            Please sign in to get your TV watchList
          </div>
          <div className="ui divider"></div>
          <div className="ui divided items">
            <TvShowWatchList />
          </div>
        </div>
      );
    }

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
        <div className="ui container watchListTable">{watchlistTable}</div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

// <div className="ui divided items">{this.getWatchList()}</div>
