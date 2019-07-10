import React from "react";
import { connect } from "react-redux";
import SearchBar from "../components/SearchBar";
import TVRow from "../components/TVRow";
import "./Home.css";
import Particles from "react-particles-js";

//Importing redux actions
import {
  setUserNameField,
  setPasswordField,
  setSearchField,
  requestToken,
  requestTVShows
} from "../actions";

const particlesOptions = {
  particles: {
    number: {
      value: 200,
      density: {
        enable: true,
        value_area: 1500
      }
    }
  }
};

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

    // Bound instead of using arrow functions for handle change, otherwise you create a new function each time the arrow change is called
    // I did not do this for handleAuthenticate since it'll only be called a few times
    this.handleChange = this.handleChange.bind(this);
  }

  // Once the component mounts it will call an action to grab a list of the first page of popular tv shows
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

  handleAuthenticate = e => {
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
  };

  // If the TV props does not exist it displays a loading, otherwise it will display the WatchList
  //TODO: Fix the loader , probabbly should have the conditional in the render to display loader not here
  displayTVshows = () => {
    const TVshows = this.props.TVshows;
    //Conditional for displaying loader should be in the render to make it look better and not display any table etc
    if (TVshows.length === 0) {
      return <tr className="ui active centered inline loader"></tr>;
    } else {
      return TVshows.results.map(show => (
        <TVRow
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
  };

  render() {
    // Deconstructing the props to use easier
    const { onPWChange, onUNChange, onSearchChange, un, pw } = this.props;

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
        <Particles className="particles" params={particlesOptions} />
        <div className="ui container">
          <table className="ui celled table  ">
            <thead className="">
              <tr className="">
                <th className="">Title</th>
                <th className="">Year</th>
                <th className="">Avg Rating</th>
                <th className="">Language</th>
                <th className="">Poster</th>
                <th className="">Add to List</th>
              </tr>
            </thead>
            <tbody className="">{this.displayTVshows()}</tbody>
            <tfoot className="">
              <tr className="">
                <th colspan="6" class="">
                  <div className="ui pagination right floated menu">
                    <a className="icon item">
                      <i aria-hidden="true" class="chevron left icon"></i>
                    </a>
                    <a className="item">1</a>
                    <a className="item">2</a>
                    <a className="item">3</a>
                    <a className="item">4</a>
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
