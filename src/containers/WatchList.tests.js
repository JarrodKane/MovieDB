import React from "react";
import { shallow } from "enzyme";
import WatchList from "./WatchList";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

const mockStore = configureMockStore();
const store = mockStore({});

describe("WatchList", () => {
  it("should render correctly with no props", () => {
    const component = shallow(
      <Provider store={store}>
        <WatchList />
      </Provider>
    );

    expect(component).toMatchSnapshot();
  });
});
