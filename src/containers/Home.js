import React from "react";
import { connect } from "react-redux";
import TVRow from "../components/TVRow";
import SearchBar from "../components/SearchBar";

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
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleAuthenticate = this.handleAuthenticate.bind(this);
  }

  componentDidMount() {
    let data = {
      api: this.props.api,
      page: 1
    };
    this.props.onRequestTV(data);
  }

  // This gets called when ever the input boxes are used
  // This sets the un if it was an username change or a pw if it was a password change with each change
  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  handleAuthenticate(e) {
    //Grab the api key from props
    let data = {
      api: this.props.api,
      un: this.props.un,
      pw: this.props.pw
    };
    //Preventing the form from rerendering the screen
    e.preventDefault();

    // Calling the onRequestToken and passing in the api key that was just grabbed
    this.props.onRequestToken(data);
  }

  render() {
    const {
      onPWChange,
      onUNChange,
      onSearchChange,
      data,
      un,
      pw,
      account
    } = this.props;
    const { id } = account;
    /*const rows = this.state.movies.map(row => (
      <MovieRow
        id={row.id}
        key={row.id}
        title={row.title}
        addOrRemove={row.add}
      />
    ));user
    */
    return (
      <form className="Username ui  menu" onSubmit={this.handleAuthenticate}>
        <div className="right item">
          <div class="ui icon  input icon">
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
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
