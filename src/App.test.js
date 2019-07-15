import React from "react";
import { shallow } from "enzyme";
import App from "./App";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

const mockStore = configureMockStore();
const store = mockStore({});

describe("Home", () => {
  it("should render correctly with no props", () => {
    const component = shallow(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(component).toMatchSnapshot();
  });
});
