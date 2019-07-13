import React from "react";

//TODO: needs the callback for signed in, delete, and add to list
//TODO: Add icon to button and callback

const TvShowWatchList = props => {
  let { id, name, image, year, rate, desc } = props;
  const Poster = `https://image.tmdb.org/t/p/w500/${image}`;

  if (props.id === undefined) {
    return (
      <div className="item">
        <div className="image ui small image">
          <img
            className="ui small image"
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
  } else {
    return (
      <div className="item">
        <div className="image">
          <img alt="poster" className="ui small image" src={Poster} />
        </div>
        <div className="content">
          <div className="header">{name}</div>
          <div className="meta">
            <span className="cinema">IFC</span>
          </div>
          <div className="description">{desc}</div>
          <div className="extra">
            <button className="ui primary right floated button">
              Buy tickets
              <i aria-hidden="true" className="right chevron icon"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default TvShowWatchList;
