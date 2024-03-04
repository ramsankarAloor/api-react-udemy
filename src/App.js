import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([])

  async function fetchMovies(){
    const response = await fetch('https://swapi.dev/api/films')
    const data = await response.json()  

    const moviesList = data.results.map((item)=>{
      return {
        id: item.episode_id,
        title: item.title,
        releaseDate: item.release_date,
        openingText: item.opening_crawl
      }
    })

    setMovies(moviesList)
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovies}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
