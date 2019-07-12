import React from "react";
import AppRouter from "../navigation/AppRouter";

const Header = () => {
  return (
    <div className="ui ">
      <h1 className=" ui huge inverted vertical center aligned segment">
        My Tv shows
      </h1>
      <AppRouter />
    </div>
  );
};

export default Header;
