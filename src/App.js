import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)

  async function fetchMovies(){
    setLoading(true)
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
    setLoading(false)
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovies}>Fetch Movies</button>
      </section>
      <section>
        {!loading && movies.length >0 && <MoviesList movies={movies} />}
        {!loading && movies.length===0 && <p>No movies found</p>} 
        {loading && <p>Loading..</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
