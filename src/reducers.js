import {
  CHANGE_SEARCH_FIELD,
  CHANGE_USERNAME_FIELD,
  CHANGE_PASSWORD_FIELD,
  REQUEST_MOVIES_PENDING,
  REQUEST_MOVIES_SUCCESS,
  REQUEST_MOVIES_FAILED,
  REQUEST_RTOKEN_PENDING,
  REQUEST_RTOKEN_SUCCESS,
  REQUEST_RTOKEN_FAILED
} from "./constants";

// Setting inital state for the state
const initialState = {
  isPending: true,
  api: "9ccbc3e0393b7578cbf2eb8ae9f260c0",
  requestToken: [],
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
  watchList: [],
  error: ""
};

// Using seperate initial states for input fields
const initialStateInputs = {
  un: "Harrod",
  pw: "15Mackdog$",
  search: ""
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

export const requestToken = (state = initialState, action = {}) => {
  switch (action.type) {
    case REQUEST_RTOKEN_PENDING:
      return Object.assign({}, state, { isPending: true });

    case REQUEST_RTOKEN_SUCCESS:
      return Object.assign({}, state, {
        requestToken: action.payload,
        isPending: false
      });

    case REQUEST_RTOKEN_FAILED:
      return Object.assign({}, state, {
        error: action.payload,
        isPending: true
      });
    default:
      return state;
  }
};
