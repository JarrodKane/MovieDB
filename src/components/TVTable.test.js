import React from "react";
import { shallow } from "enzyme";
//import renderer from "react-test-renderer";
import TVTable from "./TVTable";

/*
test("TVTable component", () => {
  const component = renderer.create(<TVTable />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
*/

describe("TVTable", () => {
  it("should render correctly with no props", () => {
    const component = shallow(<TVTable />);

    expect(component).toMatchSnapshot();
  });
});
