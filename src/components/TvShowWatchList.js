import React from "react";

//TODO: needs the callback for signed in, delete, and add to list
//TODO: Add icon to button and callback

const TvShowWatchList = props => {
  /*let { id, name, image, year, rate, lang } = props;
  const percentageRating = rate * 10;
  const Poster = `https://image.tmdb.org/t/p/w500/${image}`;
  */
  return (
    <div className="item">
      <div className="image">
        <img
          alt="poster"
          src="https://image.tmdb.org/t/p/w500/b71BaRjp9TwxUZodLGgSRIlkfL8.jpg"
        />
      </div>
      <div className="content">
        <div className="header">Watchmen</div>
        <div className="meta">
          <span className="cinema">IFC</span>
        </div>
        <div className="description">Description stuff</div>
        <div className="extra">
          <button className="ui primary right floated button">
            Buy tickets
            <i aria-hidden="true" className="right chevron icon"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TvShowWatchList;
