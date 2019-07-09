import axois from "../api/TheMovieDB";

// Only returns 20 per page
////Object { avatar: {…}, id: 8537434, iso_639_1: "en", iso_3166_1: "US", name: "", include_adult: false, username: "Harrod" }
// Which ISO is used for language?
//TV shows will always display with the most recent tv shows when called
export async function getTVLatest(api, page = 1) {
  try {
    let rtData = {};

    let data = {
      TVshows: ""
    };

    let res = await axois
      .get(`tv/popular?api_key=${api}&language=en-US&page=${page}`)
      .then(res => (data["TVshows"] = res.data));

    // data["TVshows"] = res.data;
    rtData = data.TVshows;
    return rtData;
  } catch (e) {
    alert(e);
  }
}
