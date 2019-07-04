import axois from "../api/TheMovieDB";

//const api = "9ccbc3e0393b7578cbf2eb8ae9f260c0";

// This function will go create a request_token, after that it sets the request token into the data object
// This then does another call to the api to validate a login, so takes in the dataobject
// after this it then takes the validated key to user and creates a new session
// With the response of the session we now set the data object and send it back to the calling function
export async function createRequestToken(api, un, pw) {
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
    console.log(rtData);
    return rtData;
  } catch (e) {
    alert(e);
  }
}

//TODO: Delete session

/*
//Getting account details so that we can use the ID of the account to grab the wathclist and other calls
async getAccDet() {
  const api = this.props.api;
  const session_id = this.state.session_id;
  let userDeets = [];

  try {
    let res = await axois.get(
      `/account?api_key=${api}&session_id=${session_id}`
    );
    userDeets = res.data;
    this.setState({ userDeets });
    this.getWatchList();
  } catch (e) {
    alert(e);
    this.setState({ loading: false });
  }
}
*/
