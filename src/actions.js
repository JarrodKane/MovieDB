import axois from "./api/TheMovieDB";
import { createRequestToken } from "./api/OAuth";
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
    .catch(error => dispatch({ type: REQUEST_RTOKEN_FAILED, payload: error }));
};
