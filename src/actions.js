import axois from "./api/TheMovieDB";
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
/*
export const requestToken = () => (dispatch, api) => {
  console.log(api);
  dispatch({ type: REQUEST_RTOKEN_PENDING });
  axois
    .get(`authentication/token/new?api_key=${api}`)
    .then(data => dispatch({ type: REQUEST_RTOKEN_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: REQUEST_RTOKEN_FAILED, payload: error }));
};
*/

export const requestToken = api => dispatch => {
  dispatch({ type: REQUEST_RTOKEN_PENDING });
  axois
    .get(`authentication/token/new?api_key=${api}`)
    .then(data => dispatch({ type: REQUEST_RTOKEN_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: REQUEST_RTOKEN_FAILED, payload: error }));
};

/*
export async function createRequestToken1(api, un, pw) {
  try {
    let rtData = {};

    let data = {
      username: un,
      password: pw,
      request_token: "",
      session_id: ""
    };

    let res = await axois
      .get(`authentication/token/new?api_key=${api}`)
      .then(res => (data["request_token"] = res.data.request_token))
      .then(res =>
        axois.post(
          `authentication/token/validate_with_login?api_key=${api}`,
          data
        )
      )
      .then(res =>
        axois.post(`authentication/session/new?api_key=${api}`, data)
      );

    data["session_id"] = res.data.session_id;
    rtData = data;
    return rtData;
  } catch (e) {
    alert(e);
  }
}
*/
