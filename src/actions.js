import axois from "./api/TheMovieDB";
import { createRequestToken, getAccDet } from "./api/OAuth";
import { getTVLatest } from "./api/TVshows";
import { getAccountStatus, getWatchList } from "./api/UserFun";
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
  REQUEST_WATCHLIST_FAILED
} from "./constants";

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

// -- ASYNC Calls

// OAuth
//Requesting for a request_token with api key
export const requestToken = data => dispatch => {
  dispatch({ type: REQUEST_RTOKEN_PENDING });
  createRequestToken(data.api, data.un, data.pw)
    .then(data => dispatch({ type: REQUEST_RTOKEN_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: REQUEST_RTOKEN_FAILED, payload: error }))
    .then(res => {
      dispatch({ type: REQUEST_ACC_PENDING, data });
      getAccDet(res.payload.api, res.payload.session_id)
        .then(data => dispatch({ type: REQUEST_ACC_SUCCESS, payload: data }))
        .catch(error => dispatch({ type: REQUEST_ACC_FAILED, payload: error }));
    });
};

/* //Need this if we're getting the watchlist for no reason?
export const requestToken = data => dispatch => {
  let session_id;
  dispatch({ type: REQUEST_RTOKEN_PENDING });
  createRequestToken(data.api, data.un, data.pw)
    .then(data => dispatch({ type: REQUEST_RTOKEN_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: REQUEST_RTOKEN_FAILED, payload: error }))
    .then(res => {
      dispatch({ type: REQUEST_ACC_PENDING, data });
      session_id = res.payload.session_id;
      getAccDet(res.payload.api, session_id)
        .then(data => dispatch({ type: REQUEST_ACC_SUCCESS, payload: data }))
        .catch(error => dispatch({ type: REQUEST_ACC_FAILED, payload: error }))
        .then(res => {
          dispatch({ type: REQUEST_WATCHLIST_PENDING, data });
          getWatchList(res.payload, data, session_id)
            .then(data =>
              dispatch({ type: REQUEST_WATCHLIST_SUCCESS, payload: data })
            )
            .catch(error =>
              dispatch({ type: REQUEST_WATCHLIST_FAILED, payload: error })
            );
        });
    });
};
*/
//Action to call the watchlist
export const requestWatchList = data => dispatch => {
  dispatch({ type: REQUEST_WATCHLIST_PENDING });
  getWatchList(data)
    .then(data => dispatch({ type: REQUEST_WATCHLIST_SUCCESS, payload: data }))
    .catch(error =>
      dispatch({ type: REQUEST_WATCHLIST_FAILED, payload: error })
    );
};

//Set the account details for the account sign in

export const requestTVShows = data => dispatch => {
  dispatch({ type: REQUEST_TV_PENDING });
  getTVLatest(data.api, data.page)
    .then(data => dispatch({ type: REQUEST_TV_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: REQUEST_TV_FAILED, payload: error }));
};

/*
export const requestTVShowsAuth = data => dispatch => {
  dispatch({ type: REQUEST_TV_PENDING });
  getTVLatest(data.api, data.page)
    .then(data => dispatch({ type: REQUEST_TV_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: REQUEST_TV_FAILED, payload: error }))
    .then(res => {
      getAccountStatus({ type: REQUEST_STATES_PENDING, data });
      getAccDet(res.payload.api, res.payload.session_id, res.payload.tv_id)
        .then(data => dispatch({ type: REQUEST_STATES_SUCCESS, payload: data }))
        .catch(error =>
          dispatch({ type: REQUEST_STATES_FAILED, payload: error })
        );
    });
};
*/

//Action to call the getAccountStatus
export const requestAccountStates = (data, tv_id) => dispatch => {
  dispatch({ type: REQUEST_STATES_PENDING });
  getAccountStatus(data, tv_id)
    .then(data => dispatch({ type: REQUEST_STATES_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: REQUEST_STATES_FAILED, payload: error }));
};
