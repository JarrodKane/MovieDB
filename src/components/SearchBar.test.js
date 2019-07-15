import React from "react";
import { shallow } from "enzyme";
import SearchBar from "./SearchBar";
describe("Header", () => {
  it("should render correctly with no props", () => {
    const component = shallow(<SearchBar />);

    expect(component).toMatchSnapshot();
  });
});
