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
  requestAccountStates,
  requestAddOrRemoves,
  deleteShow,
  userLogout
} from "../actions";

//Mapping reduxProps
const mapStateToProps = state => {
  return {
    un: state.setFields.un,
    pw: state.setFields.pw,
    search: state.setFields.search,
    isPending: state.requestToken.isPending,
    error: state.requestToken.error,
    requestToken: state.requestToken.requestToken,
    data: state.requestToken.data,
    api: state.requestToken.api,
    account: state.requestAccount.account,
    isSignedIn: state.requestAccount.isSignedIn,
    TVshows: state.requestTVShows.TVshows,
    watchList: state.requestWatchList.watchList,
    errorData: state.requestAccount.errorData
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
    onRequestWatchList: data => dispatch(requestWatchList(data)),
    onRequestAddOrRemove: data => dispatch(requestAddOrRemoves(data)),
    onRemoveFromWatch: data => dispatch(deleteShow(data)),
    onLogout: () => dispatch(userLogout())
  };
};

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  // Once the component mounts it will call an action to grab a list of the first page of popular tv shows
  // If to make sure it only grabs it if the TVshows prop is blank
  //If the user is signed in and the component mounts it will check through the watchlist to update what the user already has added or not
  componentDidMount() {
    const isSignedIn = this.props.isSignedIn;
    if (this.props.TVshows.length === 0) {
      let data = {
        api: this.props.api,
        page: 1,
        query: false
      };
      this.props.onRequestTV(data);
    }
    if (isSignedIn) {
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
      page: 1,
      query: false
    };
    this.props.onRequestToken(data); // Calling the onRequestToken and passing in the api key that was just grabbed
    this.props.onRequestTV(data);
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
      iso_639_1: iso_639_1,
      query: false
    };
    this.props.onRequestWatchList(data);
  }

  submitSearchClick = () => {
    const { api } = this.props;
    const search = this.props.search;

    const data = {
      api: api,
      page: 1,
      search: search,
      query: true
    };

    this.props.onRequestTV(data);
  };

  //This will get take the id from the event, passs it in with the users account, and either apply or remove it from the watchList
  // Change the css to red rather than recalling the watchlist
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

  //Logs the user out and grabs the popular tv shows to show
  handleLogout = () => {
    this.props.onLogout();
    let data = {
      api: this.props.api,
      page: 1,
      query: false
    };

    this.props.onRequestTV(data);
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
      search,
      isSignedIn,
      TVshows,
      watchList,
      errorData
    } = this.props;

    let tvElements;
    if (TVshows.length === 0) {
      tvElements = <tr className="ui active inline centerd huge loader"></tr>;
    } else if (isSignedIn) {
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
          watchList={watchList}
        />
      ));
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
          watchList={watchList}
        />
      ));
    }

    return (
      <div className="ui">
        <SearchBar
          un={un}
          pw={pw}
          search={search}
          submitLogin={this.handleAuthenticate}
          onUNChange={onUNChange}
          onPWChange={onPWChange}
          onSearchChange={onSearchChange}
          submitSearch={this.submitSearchClick}
          errorData={errorData}
          handleLogout={this.handleLogout}
          isSignedIn={isSignedIn}
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
