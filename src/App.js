import React, { useEffect, useState, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState({});
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  const [newTitle, setNewTitle] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newText, setNewText] = useState("");

  const fetchMovies = useCallback(async function () {
    setErr(null);
    setLoading(true);

    try {
      const response = await fetch(
        "https://api-react-udemy-default-rtdb.firebaseio.com/movies.json"
      );

      if (!response.ok) {
        throw new Error("something went wrong!!");
      }

      const moviesObj = await response.json();
      setMovies(moviesObj);

    } catch (error) {
      setErr(error.message);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  let content = <p>No movies found</p>;

  if (movies) {
    content = <MoviesList movies={movies} fetchMovies={fetchMovies}/>;
  }

  if (err) {
    content = <p>{err}</p>;
  }

  if (loading) {
    content = <p>Loading..</p>;
  }

  async function addMovieHandler() {
    let obj = {
      title: newTitle,
      openingText: newText,
      releaseDate: newDate,
    };

    await fetch(
      "https://api-react-udemy-default-rtdb.firebaseio.com/movies.json",
      {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    setNewDate('')
    setNewText('')
    setNewTitle('')
  }

  return (
    <React.Fragment>
      <section>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        ></input>
        <label htmlFor="op-text">Opening text</label>
        <textarea
          id="op-text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
        ></textarea>
        <label htmlFor="r-date">Release date</label>
        <input
          type="date"
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
        ></input>
        <button onClick={addMovieHandler}>Add movie</button>
      </section>
      <section>
        <button onClick={fetchMovies}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
