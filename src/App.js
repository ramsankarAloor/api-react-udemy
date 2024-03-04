import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);

  async function fetchMovies() {
    setErr(null);
    setLoading(true);

    try {
      const response = await fetch("https://swapi.dev/api/film");

      if (!response.ok) {
        throw new Error("something went wrong!!");
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

      // as setTimeout is inside fetchMovies each time it gets called, new setTimeout is called again, fucntions like setInterval
      
      const id = setTimeout(fetchMovies, 5000);
      setTimeoutId(id);
    }

    setLoading(false);
  }

  function handleCancelRetry(){
    clearTimeout(timeoutId)
    setTimeoutId(null)
  }

  let content = <p>No movies found</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }
  if (err) {
    content = (
      <>
        <p>{err}</p>
        {timeoutId && <><p>Retrying..</p><button onClick={handleCancelRetry}>Cancel retry</button></>}
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
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
