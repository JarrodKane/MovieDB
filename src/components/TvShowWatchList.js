import React from "react";

const TvShowWatchList = props => {
  let { id, name, image, year, rate, desc, handleClickAdd } = props;
  const Poster = `https://image.tmdb.org/t/p/w500/${image}`;

  if (props.id === undefined) {
    return <div className="item"></div>;
  } else {
    return (
      <div className="item">
        <div className="image">
          <img alt="poster" className="ui small image" src={Poster} />
        </div>
        <div className="content">
          <div className="header">{name}</div>
          <div className="meta">
            <span className="cinema">
              Year: {year} - Ratting: {rate}
            </span>
          </div>

          <div className="description">{desc}</div>
          <div className="extra">
            <button
              id={`R-${id}`}
              onClick={handleClickAdd}
              className="ui primary button"
            >
              Remove From List
              <i aria-hidden="true" className="right chevron icon"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default TvShowWatchList;
