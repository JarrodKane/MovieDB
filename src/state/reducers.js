import {
  CHANGE_SEARCH_FIELD,
  CHANGE_USERNAME_FIELD,
  CHANGE_PASSWORD_FIELD,
  REQUEST_RTOKEN_PENDING,
  REQUEST_RTOKEN_SUCCESS,
  REQUEST_RTOKEN_FAILED,
  REQUEST_ACC_PENDING,
  REQUEST_ACC_SUCCESS,
  REQUEST_ACC_FAILED,
  REQUEST_TV_PENDING,
  REQUEST_TV_SUCCESS,
  REQUEST_TV_FAILED,
  REQUEST_STATES_PENDING,
  REQUEST_STATES_SUCCESS,
  REQUEST_STATES_FAILED,
  REQUEST_WATCHLIST_PENDING,
  REQUEST_WATCHLIST_SUCCESS,
  REQUEST_WATCHLIST_FAILED,
  ADD_OR_REMOVE,
  REQUEST_SEARCH_PENDING,
  REQUEST_SEARCH_SUCCESS,
  REQUEST_SEARCH_FAILED,
  ERROR_NO_DATA,
  USER_LOGOUT
} from "../constants/constants";

// Setting inital state for the state
const initialState = {
  un: "",
  pw: "",
  search: "",
  error: ""
};

export const userLogout = (action = {}) => {
  switch (action.type) {
    case USER_LOGOUT:
      return { USER_LOGOUT };
    default:
      return USER_LOGOUT;
  }
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
      return Object.assign({}, state, { isPending: true, errorData: false });

    case REQUEST_RTOKEN_SUCCESS:
      return Object.assign({}, state, {
        data: action.payload,
        isPending: false,
        errorData: false
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
  // accountStat: false,
  isPending: true,
  error: "",
  account: [],
  isSignedIn: false,
  errorData: false
};

export const requestAccount = (state = initialStateAccount, action = {}) => {
  switch (action.type) {
    case ERROR_NO_DATA:
      return Object.assign({}, state, { errorData: true });
    case REQUEST_ACC_PENDING:
      return Object.assign({}, state, { isPending: true, errorData: false });

    case REQUEST_ACC_SUCCESS:
      return Object.assign({}, state, {
        account: action.payload,
        isSignedIn: true,
        isPending: false,
        errorData: false
      });

    case REQUEST_ACC_FAILED:
      return Object.assign({}, state, {
        error: action.payload,
        isPending: false,
        errorData: false
      });
    default:
      return state;
  }
};

const initialStateTV = {
  isPending: true,
  error: "",
  TVshows: [],
  haveTV: false,
  stateCheck: []
};

// Request for a TV show without authentication
export const requestTVShows = (state = initialStateTV, action = {}) => {
  switch (action.type) {
    case REQUEST_TV_PENDING:
      return Object.assign({}, state, { isPending: true });

    case REQUEST_TV_SUCCESS:
      return Object.assign({}, state, {
        TVshows: action.payload,
        haveTV: false,
        isPending: false
      });

    case REQUEST_TV_FAILED:
      return Object.assign({}, state, {
        error: action.payload,
        isPending: true
      });
    case REQUEST_SEARCH_PENDING:
      return Object.assign({}, state, { isPending: true });

    case REQUEST_SEARCH_SUCCESS:
      return Object.assign({}, state, {
        watchList: action.payload,
        isPending: false
      });

    case REQUEST_SEARCH_FAILED:
      return Object.assign({}, state, {
        error: action.payload,
        isPending: true
      });
    default:
      return state;
  }
};

// -- Getting the users watchlist
const initialWatchList = {
  isPending: true,
  error: "",
  watchList: []
};

export const requestWatchList = (state = initialWatchList, action = {}) => {
  switch (action.type) {
    case REQUEST_WATCHLIST_PENDING:
      return Object.assign({}, state, { isPending: true });

    case REQUEST_WATCHLIST_SUCCESS:
      return Object.assign({}, state, {
        watchList: action.payload,
        isPending: false
      });

    case REQUEST_WATCHLIST_FAILED:
      return Object.assign({}, state, {
        error: action.payload,
        isPending: true
      });

    default:
      return state;
  }
};

//Gets back a status of if the movie is in the watchlist or not
export const requestAccountStates = (state = initialStateTV, action = {}) => {
  switch (action.type) {
    case REQUEST_STATES_PENDING:
      return Object.assign({}, state, { isPending: true });

    case REQUEST_STATES_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        stateCheck: action.payload,
        isPending: false
      });

    case REQUEST_STATES_FAILED:
      return Object.assign({}, state, {
        error: action.payload,
        isPending: true
      });
    default:
      return state;
  }
};

const initialWatchListAddRemove = {
  isPending: true,
  error: "",
  tvShow: []
};

export const requestAddOrRemoves = (
  state = initialWatchListAddRemove,
  action = {}
) => {
  switch (action.type) {
    case REQUEST_WATCHLIST_PENDING:
      return Object.assign({}, state, { isPending: true });

    case REQUEST_WATCHLIST_SUCCESS:
      return Object.assign({}, state, {
        tvShow: action.payload,
        isPending: false
      });

    case REQUEST_WATCHLIST_FAILED:
      return Object.assign({}, state, {
        error: action.payload,
        isPending: true
      });
    default:
      return state;
  }
};

export const addOrDelete = (state = initialWatchList, action) => {
  switch (action.type) {
    case ADD_OR_REMOVE:
      //let tv_id = action.payload;
      return {
        ...state,
        watchList: state.watchList.filter(
          show => show.watchList.results.id !== action.tv_id
        )
      };

    default:
      return state;
  }
};
