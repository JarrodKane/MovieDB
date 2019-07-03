import React from "react";

//TODO: needs the callback for signed in, delete, and add to list
//TODO: Add icon to button and callback

const MovieRow = props => {
  return (
    <div>
      <div>Image</div>
      <h3>{props.title}</h3>
      <h3>Year</h3>
      <h3>Rating</h3>
      <h3>Language</h3>
      <button>Add if signed in</button>
    </div>
  );
};

export default MovieRow;
