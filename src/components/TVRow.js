import React from "react";

const TVRow = props => {
  const {
    id,
    name,
    image,
    year,
    rate,
    lang,
    handleClickAdd,
    isSignedIn,
    watchList
  } = props;
  const percentageRating = rate * 10;
  const Poster = `https://image.tmdb.org/t/p/w500/${image}`;

  let addOrDis;
  if (isSignedIn === false) {
    addOrDis = (
      <td id={id} className=" center aligned negative" onClick={handleClickAdd}>
        <i id={id} aria-hidden="true" className="grey sign-in huge icon"></i>
        <div>Sign In</div>
      </td>
    );
  } else {
    // This is for before there is an array of watchlists returned
    if (watchList.length === 0) {
      addOrDis = (
        <td
          id={`A-${id}`}
          className="selectable center aligned  huge icon "
          onClick={handleClickAdd}
        >
          <i
            id={`A-${id}`}
            aria-hidden="true"
            className="grey heart huge icon"
          ></i>
        </td>
      );
      // This is for if there is an array returned but there are no movies in the watchlist yet
    } else if (watchList.results.length === 0) {
      console.log(watchList);
      addOrDis = (
        <td
          id={`A-${id}`}
          className="selectable center aligned  huge icon "
          onClick={handleClickAdd}
        >
          <i
            id={`A-${id}`}
            aria-hidden="true"
            className="grey heart huge icon"
          ></i>
        </td>
      );
    } else {
      let watchListS = watchList.results;
      for (let i = 0; i < watchListS.length; i++) {
        if (watchListS[i].id === id) {
          addOrDis = (
            <td
              id={`R-${id}`}
              className="selectable center aligned  huge icon "
              onClick={handleClickAdd}
            >
              <i
                id={`R-${id}`}
                aria-hidden="true"
                className="red heart huge icon"
              ></i>
            </td>
          );
          break;
        } else {
          addOrDis = (
            <td
              id={`A-${id}`}
              className="selectable center aligned  huge icon "
              onClick={handleClickAdd}
            >
              <i
                id={`A-${id}`}
                aria-hidden="true"
                className="grey heart huge icon"
              ></i>
            </td>
          );
        }
      }
    }
  }

  return (
    <tr id={id} className="">
      <td className="">
        <img
          src={Poster}
          alt={`Poster of ${name}`}
          className="ui small image "
        />
      </td>
      <td className="ui medium header">{name}</td>
      <td className="">{year}</td>
      <td className="">{`${percentageRating}%`}</td>
      <td className="">{lang}</td>

      {addOrDis}
    </tr>
  );
};

export default TVRow;

//<div class="ui red label">Red</div>
