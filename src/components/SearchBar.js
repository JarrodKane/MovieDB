import React from "react";

const SearchBar = props => {
  const {
    un,
    pw,
    search,
    submitLogin,
    onUNChange,
    onPWChange,
    onSearchChange
  } = props;
  return (
    <form className="Username ui  menu" onSubmit={submitLogin}>
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
  );
};

export default SearchBar;
