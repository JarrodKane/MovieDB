import React from "react";
import { shallow } from "enzyme";
import TvShowWatchList from "./TvShowWatchList";
describe("TvShowWatchList", () => {
  it("should render correctly with no props", () => {
    const component = shallow(<TvShowWatchList />);

    expect(component).toMatchSnapshot();
  });
});
