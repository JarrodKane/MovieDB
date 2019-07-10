import React from "react";
import { connect } from "react-redux";

//Importing redux actions
import {
  setUserNameField,
  setPasswordField,
  setSearchField,
  requestToken,
  requestTVShows
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
    TVshows: state.requestTVShows.TVshows
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUNChange: event => dispatch(setUserNameField(event.target.value)),
    onPWChange: event => dispatch(setPasswordField(event.target.value)),
    onSearchChange: event => dispatch(setSearchField(event.target.value)),
    onRequestToken: data => dispatch(requestToken(data)),
    onRequestTV: data => dispatch(requestTVShows(data))
  };
};

class Home extends React.Component {
  // Once the component mounts it will call an action to grab a list of the first page of popular tv shows
  //Checks if user details are there otherwise just returns a recomended movie, and suggestion to sign in
  getWatchList() {
    console.log(this.props.account);
    let watchlistTable = "";
    if (this.props.account.length === 0) {
      return (watchlistTable = <div>Nothing in there</div>);
    } else {
      return (watchlistTable = <div>There's stuff in there</div>);
    }
  }

  //If a user now logs in, it will make the call for the users watchlist
  componentDidUpdate() {
    let data = {
      api: this.props.api,
      page: 1
    };
    // this.props.onRequestTV(data);
  }

  render() {
    // Deconstructing the props to use easier
    const { onPWChange, onUNChange, onSearchChange, un, pw } = this.props;

    return (
      <div className="ui">
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
        <div>{this.getWatchList()}</div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
