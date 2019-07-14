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

export async function searchTV(data) {
  const { api, search } = data;

  try {
    let res = await axois
      .get(`/search/tv?api_key=${api}&language=en-US&query=${search}&page=1`)
      .then(res => (data["TVshows"] = res.data));

    console.log(res.results);
    return res;
  } catch (e) {
    alert(e);
  }
}
