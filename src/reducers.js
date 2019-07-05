import {
  CHANGE_SEARCH_FIELD,
  CHANGE_USERNAME_FIELD,
  CHANGE_PASSWORD_FIELD
} from "./constants";

const initialState = {
  api: "9ccbc3e0393b7578cbf2eb8ae9f260c0",
  movies: [
    { id: "213", title: "Hacker", add: false },
    { id: "243", title: "dingo", add: false }
  ],
  isSignedIn: false,
  un: "Harrod",
  pw: "15Mackdog$",
  search: "",
  login_session: {},
  userDetails: {},
  watchList: []
};

export const setFields = (state = initialState, action = {}) => {
  switch (action.type) {
    case CHANGE_USERNAME_FIELD:
      return { ...state, un: action.payload };
    case CHANGE_PASSWORD_FIELD:
      return { ...state, pw: action.payload };
    case CHANGE_SEARCH_FIELD:
      return { ...state, search: action.payload };
    default:
      return state;
  }
};
