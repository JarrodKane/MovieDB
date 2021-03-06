import axois from "../api/TheMovieDB";

// -- Holds the calls related to user function once a user has logged in

export async function getWatchList(api, session_id, data) {
  const { id, iso_639_1, page = 1, sort = "created_at.asc" } = data;
  try {
    let res = await axois.get(
      `account/${id}/watchlist/tv?api_key=${api}&language=${iso_639_1}&session_id=${session_id}&sort_by=${sort}&page=${page}`
    );
    return res.data;
  } catch (e) {
    alert(e);
  }
}

export async function getAccountStatus(data) {
  const { api, session_id, tv_id } = data;
  try {
    let res = await axois.get(
      `/tv/${tv_id}/account_states?api_key=${api}&language=en-US&session_id=${session_id}`
    );
    return res.data;
  } catch (e) {
    alert(e);
  }
}

// Call to add or remove the movie from the watchList
export async function addOrRemove(data) {
  const { id, session_id, api } = data;
  const body = data.body;
  try {
    let res = await axois.post(
      `account/${id}/watchlist?api_key=${api}&session_id=${session_id}`,
      body
    );
    return res.data;
  } catch (e) {
    alert(e);
  }
}
