import {
  CHANGE_SEARCH_FIELD,
  CHANGE_USERNAME_FIELD,
  CHANGE_PASSWORD_FIELD,
  REQUEST_MOVIES_PENDING,
  REQUEST_MOVIES_SUCCESS,
  REQUEST_MOVIES_FAILED,
  REQUEST_RTOKEN_PENDING,
  REQUEST_RTOKEN_SUCCESS,
  REQUEST_RTOKEN_FAILED,
  REQUEST_ACC_PENDING,
  REQUEST_ACC_SUCCESS,
  REQUEST_ACC_FAILED,
  REQUEST_TV_PENDING,
  REQUEST_TV_SUCCESS,
  REQUEST_TV_FAILED
} from "./constants";

// Setting inital state for the state
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
  watchList: [],
  error: ""
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

const initialStateAuth = {
  isPending: true,
  api: "9ccbc3e0393b7578cbf2eb8ae9f260c0",
  error: "",
  data: []
};

export const requestToken = (state = initialStateAuth, action = {}) => {
  switch (action.type) {
    case REQUEST_RTOKEN_PENDING:
      return Object.assign({}, state, { isPending: true });

    case REQUEST_RTOKEN_SUCCESS:
      return Object.assign({}, state, {
        data: action.payload,
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

const initialStateAccount = {
  accountStat: false,
  isPending: true,
  error: "",
  account: []
};

export const requestAccount = (state = initialStateAccount, action = {}) => {
  switch (action.type) {
    case REQUEST_ACC_PENDING:
      return Object.assign({}, state, { isPending: true });

    case REQUEST_ACC_SUCCESS:
      return Object.assign({}, state, {
        account: action.payload,
        isPending: false
      });

    case REQUEST_ACC_FAILED:
      return Object.assign({}, state, {
        error: action.payload,
        isPending: true
      });
    default:
      return state;
  }
};

const initialStateTV = {
  isPending: true,
  error: "",
  TVshows: []
};

export const requestTVShows = (state = initialStateTV, action = {}) => {
  switch (action.type) {
    case REQUEST_TV_PENDING:
      return Object.assign({}, state, { isPending: true });

    case REQUEST_TV_SUCCESS:
      return Object.assign({}, state, {
        TVshows: action.payload,
        isPending: false
      });

    case REQUEST_TV_FAILED:
      return Object.assign({}, state, {
        error: action.payload,
        isPending: true
      });
    default:
      return state;
  }
};
