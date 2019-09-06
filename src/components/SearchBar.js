import React from "react";
//import { Popup } from "semantic-ui-react";

const SearchBar = props => {
  const {
    un,
    pw,
    search,
    submitLogin,
    onUNChange,
    onPWChange,
    onSearchChange,
    submitSearch,
    errorData,
    handleLogout,
    isSignedIn,
    searchFalse = true
  } = props;

  let errorMesg;
  if (errorData === true) {
    errorMesg = (<div>Erros</div>
      //TODO: CHANGE FROM SEMANTIC USE
      /*
      <Popup
        trigger={<div icon="add" />}
        open={true}
        content="Fill in username or password"
      />
      */
    );
  } else {
    errorMesg = "";
  }
  let logBtn;
  if (isSignedIn === false) {
    logBtn = (
      <button className="ui primary button" onClick={submitLogin}>
        Login
      </button>
    );
  } else {
    logBtn = (
      <button className="ui red button" onClick={handleLogout}>
        Logout
      </button>
    );
  }

  return (
    <div className="ui stackable menu">
      {searchFalse ? (
        <div className="right item ">
          <div className="ui icon  input">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={onSearchChange}
            />
            <i aria-hidden="true" className="search icon"></i>
          </div>
          <button className="ui big button" onClick={submitSearch}>
            Search
          </button>
        </div>
      ) : (
          <div className="right item "></div>
        )}

      <div className="Username ui stackable menu">
        {errorMesg}
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
          <div className="ui action input ">
            <input
              type="password"
              placeholder="Password"
              id="pw"
              name="pw"
              value={pw}
              onChange={onPWChange}
            />
            {logBtn}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
