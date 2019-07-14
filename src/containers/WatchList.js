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
  requestWatchList,
  requestAddOrRemoves,
  userLogout
} from "../actions";

//Mapping reduxProps
const mapStateToProps = state => {
  return {
    un: state.setFields.un,
    pw: state.setFields.pw,
    isPending: state.requestToken.isPending,
    error: state.requestToken.error,
    requestToken: state.requestToken.requestToken,
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
    onRequestWatchList: data => dispatch(requestWatchList(data)),
    onRequestAddOrRemove: data => dispatch(requestAddOrRemoves(data)),
    onLogout: () => dispatch(userLogout())
  };
};

class WatchList extends React.Component {
  // If the user is signed in mounting this component will get the users current watchlist
  componentDidMount() {
    const { isSignedIn } = this.props;

    if (isSignedIn) {
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
    const { api, page = 1, sort = "created_at.asc" } = this.props;
    const { session_id } = this.props.data;
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

  handleClickAdd = e => {
    let arr = e.target.id.split("-");
    let tv_id = arr[1];
    let addOrRemove;
    if (arr[0] === "R") {
      addOrRemove = false;
    } else {
      addOrRemove = true;
    }
    const { api } = this.props;
    const { session_id } = this.props.data;
    const { id } = this.props.account;

    const data = {
      api: api,
      session_id: session_id,
      id: id,
      body: {
        media_type: "tv",
        media_id: tv_id,
        watchlist: addOrRemove
      }
    };
    this.props.onRequestAddOrRemove(data);
    this.handleGetWatchList();
  };

  handleLogout = () => {
    this.props.onLogout();
    let data = {
      api: this.props.api,
      page: 1,
      query: false
    };

    this.props.onRequestTV(data);
  };

  render() {
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
      if (watchList.length === 0) {
        this.handleGetWatchList();
      } else {
        watchlistTable = watchList.results.map(show => (
          <TvShowWatchList
            id={show.id}
            key={show.id}
            name={show.name}
            image={show.poster_path}
            year={show.first_air_date}
            rate={show.vote_average}
            lang={show.original_language}
            desc={show.overview}
            handleClickAdd={this.handleClickAdd}
          />
        ));
      }
    } else {
      watchlistTable = (
        <div>
          <div className="ui red message header">
            Please sign in to get your TV watchList
          </div>
          <div className="ui divider"></div>
        </div>
      );
    }

    return (
      <div className="ui">
        <SearchBar
          un={un}
          pw={pw}
          submitLogin={this.handleAuthenticate}
          onUNChange={onUNChange}
          onPWChange={onPWChange}
          handleLogout={this.handleLogout}
          isSignedIn={isSignedIn}
          searchFalse={false}
        />
        <div className="ui">
          <div className="ui container divided items watchListTable">
            {watchlistTable}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WatchList);
