import axois from "../api/TheMovieDB";

// This function will go create a request_token, after that it sets the request token into the data object
// This then does another call to the api to validate a login, so takes in the dataobject
// after this it then takes the validated key to user and creates a new session
// With the response of the session we now set the data object and send it back to the calling function
export async function createRequestToken(api, un, pw) {
  try {
    let rtData = {};

    let data = {
      api: api,
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

// Getting the accoutn details for the user account
// Needed for id of the user to grab watchlists etc
export async function getAccDet(api, session_id) {
  try {
    let rtData = {};

    let res = await axois.get(
      `/account?api_key=${api}&session_id=${session_id}`
    );
    rtData = res.data;
    return rtData;
  } catch (e) {
    alert(e);
  }
}
