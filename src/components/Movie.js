import React from "react";

import classes from "./Movie.module.css";

const Movie = (props) => {
  async function deleteMovieHandler(id) {
    const response = await fetch(
      `https://api-react-udemy-default-rtdb.firebaseio.com/movies/${id}.json`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Check if the request was successful
    if (response.ok) {
      console.log("Movie deleted successfully");
    } else {
      console.error("Failed to delete movie");
    }

    props.fetchMovies();
  }
  return (
    <li className={classes.movie}>
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
      <button
        className={classes["delete-button"]}
        onClick={() => deleteMovieHandler(props.id)}
      >
        Delete
      </button>
    </li>
  );
};

export default Movie;
