import React, { useEffect, useState, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  const [newTitle, setNewTitle] = useState('')
  const [newDate, setNewDate] = useState('')
  const [newText, setNewText] = useState('')

  const fetchMovies = useCallback(async function() {
    setErr(null);
    setLoading(true);

    try {
      const response = await fetch("https://swapi.dev/api/films");

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
    }

    setLoading(false);
  }, [])

  useEffect(()=>{
    fetchMovies()
  }, [fetchMovies])

  let content = <p>No movies found</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }
  if (err) {
    content = (
        <p>{err}</p> 
    );
  }

  if (loading) {
    content = <p>Loading..</p>;
  }

  function addMovieHandler(){
    let obj = {
      title: newTitle,
      openingText : newText,
      releaseDate : newDate
    }

    console.log(obj)
    setNewDate('')
    setNewText('')
    setNewTitle('')
  }

  return (
    <React.Fragment>
    <section>
      <label htmlFor="title">Title</label>
      <input id="title" type="text" value={newTitle} onChange={(e)=>setNewTitle(e.target.value)}></input>
      <label htmlFor="op-text">Opening text</label>
      <textarea id="op-text" value={newText} onChange={(e)=>setNewText(e.target.value)}></textarea>
      <label htmlFor="r-date">Release date</label>
      <input type="date" value={newDate} onChange={(e)=>setNewDate(e.target.value)}></input>
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
