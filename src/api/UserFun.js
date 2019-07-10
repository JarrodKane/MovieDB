import axois from "../api/TheMovieDB";

// -- Holds the calls related to user function once a user has logged in

export async function getWatchList(props) {
  const {
    api,
    id,
    session_id,
    iso_639_1,
    page = 1,
    sort = "created_at.asc"
  } = props;
  try {
    let res = await axois.get(
      `account/${id}/watchlist/tv?api_key=${api}&language=${iso_639_1}&session_id=${session_id}&sort_by=${sort}&page=${page}`
    );
    return res.data;
  } catch (e) {
    alert(e);
  }
}

export async function getAccountStatus(props, tv_id) {
  const { session_id, api } = props;
  try {
    let res = await axois.get(
      `/tv/${tv_id}/account_states?api_key=${api}&language=en-US&session_id=${session_id}`
    );
    return res.data;
  } catch (e) {
    alert(e);
  }
}
