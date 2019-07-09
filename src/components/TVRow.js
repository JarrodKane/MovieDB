import React from "react";

//TODO: needs the callback for signed in, delete, and add to list
//TODO: Add icon to button and callback

const MovieRow = props => {
  let { id, name, image, year, rate, lang } = props;
  const Poster = `https://image.tmdb.org/t/p/w500/${image}`;
  return (
    <tr id={id} className="">
      <td className="">{name}</td>
      <td className="">{year}</td>
      <td className="">{rate}</td>
      <td className="">{lang}</td>
      <td className="">
        <img src={Poster} alt={`Poster of ${name}`} class="ui small image" />
      </td>
      <td className="">
        IF user watchllist has then unadd button otherwise add button
      </td>
    </tr>
  );
};

export default MovieRow;
