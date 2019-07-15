import React from "react";
import { shallow } from "enzyme";
import TVRow from "./TVRow";
describe("TVRow", () => {
  it("should render correctly with a year prop, and a watchList prop", () => {
    const component = shallow(<TVRow year="20001" watchList="" />);

    expect(component).toMatchSnapshot();
  });
});
