import React from "react";

const SearchBar = props => {
  const {
    un,
    pw,
    search,
    submitLogin,
    onUNChange,
    onPWChange,
    onSearchChange,
    submitSearch
  } = props;
  return (
    <div className="ui menu">
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
      <div className="Username ui  menu">
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
            <button className="ui button" onClick={submitLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
