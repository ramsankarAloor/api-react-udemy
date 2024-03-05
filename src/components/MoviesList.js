import React from 'react';

import Movie from './Movie';
import classes from './MoviesList.module.css';

const MovieList = (props) => {

  let moviesArray = []
  for(let key in props.movies){
    moviesArray.push({...props.movies[key], id: key})
  }
  return (
    <ul className={classes['movies-list']}>
      {moviesArray.map((movie, index) => (
        <Movie
          key={movie.id}
          id={movie.id}
          title={movie.title}
          releaseDate={movie.releaseDate}
          openingText={movie.openingText}
          fetchMovies = {props.fetchMovies}
        />
      ))}
    </ul>
  );
};

export default MovieList;
