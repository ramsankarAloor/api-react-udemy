import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  async function fetchMovies() {
    setErr(null);
    setLoading(true);

    try {
      const response = await fetch("https://swapi.dev/api/films");

      if (!response.ok) {
        throw new Error("something went wrong...");
      }

      const data = await response.json();
      const moviesList = data.results.map((item) => {
        return {
          id: item.episode_id,
          title: item.title,
          releaseDate: item.release_date,
          openingText: item.opening_crawl,
        };
      });

      setMovies(moviesList);
    } catch (error) {
      setErr(error.message);
    }

    setLoading(false);
  }

  let content = <p>No movies found</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }
  if (err) {
    content = (
      <>
        <p>{err}</p> 
      </>
    );
  }

  if (loading) {
    content = <p>Loading..</p>;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovies}>Fetch Movies</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
