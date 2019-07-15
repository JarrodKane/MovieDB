import { createRequestToken, getAccDet } from "../api/OAuth";
import { getTVLatest, searchTV } from "../api/TVshows";
import { getAccountStatus, getWatchList, addOrRemove } from "../api/UserFun";
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
  REQUEST_WATCHLIST_PENDING,
  REQUEST_WATCHLIST_SUCCESS,
  REQUEST_WATCHLIST_FAILED,
  REQUEST_STATES_PENDING,
  REQUEST_STATES_SUCCESS,
  REQUEST_STATES_FAILED,
  REQUEST_ADDORREMOVE_PENDING,
  REQUEST_ADDORREMOVE_SUCCESS,
  REQUEST_ADDORREMOVE_FAILED,
  ADD_OR_REMOVE,
  ERROR_NO_DATA,
  USER_LOGOUT
} from "../constants/constants";

// Changing inputs
export const setUserNameField = text => ({
  type: CHANGE_USERNAME_FIELD,
  payload: text
});

export const setPasswordField = text => ({
  type: CHANGE_PASSWORD_FIELD,
  payload: text
});

export const setSearchField = text => ({
  type: CHANGE_SEARCH_FIELD,
  payload: text
});

//TODO: Change deleteShow to addOrRemoveShow
export const deleteShow = text => ({
  type: ADD_OR_REMOVE,
  payload: text
});

export const userLogout = () => ({
  type: USER_LOGOUT
});

// -- ASYNC Calls

// OAuth
//Requesting for a request_token with api key
//Once it is gotten it is then used to authenticate it against a user
export const requestToken = data => dispatch => {
  if (data.un === "" || data.pw === "") {
    dispatch({ type: ERROR_NO_DATA });
  } else {
    let { api } = data;
    dispatch({ type: REQUEST_RTOKEN_PENDING });
    createRequestToken(data.api, data.un, data.pw)
      .then(data => dispatch({ type: REQUEST_RTOKEN_SUCCESS, payload: data }))
      .then(res => {
        dispatch({ type: REQUEST_ACC_PENDING, data });
        let session_id = res.payload.session_id;

        getAccDet(res.payload.api, res.payload.session_id)
          .then(data => dispatch({ type: REQUEST_ACC_SUCCESS, payload: data }))
          .then(res => {
            dispatch({ type: REQUEST_WATCHLIST_PENDING, data });
            getWatchList(api, session_id, res.payload)
              .then(data =>
                dispatch({ type: REQUEST_WATCHLIST_SUCCESS, payload: data })
              )
              .catch(error =>
                dispatch({ type: REQUEST_WATCHLIST_FAILED, payload: error })
              );
          })
          .catch(error =>
            dispatch({ type: REQUEST_ACC_FAILED, payload: error })
          );
      })
      .catch(error =>
        dispatch({ type: REQUEST_RTOKEN_FAILED, payload: error })
      );
  }
};

//Action to call the watchlist
export const requestWatchList = data => dispatch => {
  dispatch({ type: REQUEST_WATCHLIST_PENDING });
  getWatchList(data.api, data.session_id, data)
    .then(data => dispatch({ type: REQUEST_WATCHLIST_SUCCESS, payload: data }))
    .catch(error =>
      dispatch({ type: REQUEST_WATCHLIST_FAILED, payload: error })
    );
};

export const requestTVShows = data => dispatch => {
  if (data.query === true && data.search !== "") {
    dispatch({ type: REQUEST_TV_PENDING });
    searchTV(data)
      .then(data => dispatch({ type: REQUEST_TV_SUCCESS, payload: data }))
      .catch(error => dispatch({ type: REQUEST_TV_FAILED, payload: error }));
  } else if (data.query === true && data.search === "") {
    dispatch({ type: REQUEST_TV_PENDING });
    getTVLatest(data.api, data.page)
      .then(data => dispatch({ type: REQUEST_TV_SUCCESS, payload: data }))
      .catch(error => dispatch({ type: REQUEST_TV_FAILED, payload: error }));
  } else {
    dispatch({ type: REQUEST_TV_PENDING });
    getTVLatest(data.api, data.page)
      .then(data => dispatch({ type: REQUEST_TV_SUCCESS, payload: data }))
      .catch(error => dispatch({ type: REQUEST_TV_FAILED, payload: error }));
  }
};

//Action to call to see if the tv show is in the watchlist
export const requestAccountStates = data => dispatch => {
  dispatch({ type: REQUEST_STATES_PENDING });
  getAccountStatus(data)
    .then(data => dispatch({ type: REQUEST_STATES_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: REQUEST_STATES_FAILED, payload: error }));
};

//This will send for a remove or add first
//Then ask for the list that we're looking at to be refreshed, so that the heart updates
export const requestAddOrRemoves = data => dispatch => {
  let { api, session_id } = data;
  dispatch({ type: REQUEST_ADDORREMOVE_PENDING });
  addOrRemove(data)
    .then(data =>
      dispatch({ type: REQUEST_ADDORREMOVE_SUCCESS, payload: data })
    )
    .catch(error =>
      dispatch({ type: REQUEST_ADDORREMOVE_FAILED, payload: error })
    )
    .then(res => {
      dispatch({ type: REQUEST_WATCHLIST_PENDING, data });
      getWatchList(api, session_id, res.payload)
        .then(data =>
          dispatch({ type: REQUEST_WATCHLIST_SUCCESS, payload: data })
        )
        .catch(error =>
          dispatch({ type: REQUEST_WATCHLIST_FAILED, payload: error })
        );
    });
};
