import React from "react";

//TODO: needs the callback for signed in, delete, and add to list
//TODO: Add icon to button and callback

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
    checkShowVsWatchList,
    haveTV
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
    checkShowVsWatchList(id);

    /* if (checkTV.watchlist === true) {
      addOrDis = (
        <td
          id={id}
          className="selectable center aligned  huge icon "
          onClick={handleClickAdd}
        >
          <i id={id} aria-hidden="true" className="red heart huge icon"></i>
        </td>
      );
    } else {
      addOrDis = (
        <td
          id={id}
          className="selectable center aligned  huge icon "
          onClick={handleClickAdd}
        >
          <i id={id} aria-hidden="true" className="grey heart huge icon"></i>
        </td>
      );
    }
    */
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
