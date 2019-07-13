import axois from "../api/TheMovieDB";

export async function getTVLatest(api, page = 1) {
  try {
    let rtData = {};

    let data = {
      TVshows: ""
    };

    let res = await axois
      .get(`tv/popular?api_key=${api}&language=en-US&page=${page}`)
      .then(res => (data["TVshows"] = res.data));

    rtData = data.TVshows;
    return rtData;
  } catch (e) {
    alert(e);
  }
}
