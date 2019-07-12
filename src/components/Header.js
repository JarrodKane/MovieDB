import React from "react";
import AppRouter from "../navigation/AppRouter";

const Header = () => {
  return (
    <div className="ui  segment">
      <h1>My Tv shows</h1>
      <AppRouter />
    </div>
  );
};

export default Header;
