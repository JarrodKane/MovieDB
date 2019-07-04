import axois from "../api/TheMovieDB";

// Only returns 20 per page
////Object { avatar: {…}, id: 8537434, iso_639_1: "en", iso_3166_1: "US", name: "", include_adult: false, username: "Harrod" }
// Which ISO is used for language?
export async function getWatchList(props) {
  const { session_id, api, page, sort } = props;
  let { id, iso_639_1 } = props.userDetails.details;

  try {
    let res = await axois.get(
      `account/${id}/watchlist/movies?api_key=${api}&language=${iso_639_1}&session_id=${session_id}&sort_by=${sort}&page=${page}`
    );

    return res.data;
  } catch (e) {
    alert(e);
    this.setState({ loading: false });
  }
}

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
