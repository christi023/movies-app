import React from 'react';
import { Link } from 'react-router-dom';
// styles
import './MovieSearch.css';

const MovieSearch = ({ movie }) => {
  const handleChange = () => {
    sessionStorage.setItem('movieId', movie.imdbID);
  };

  return (
    // setup for movie search result
    <div className="movie-card">
      <img src={movie.Poster} alt="" />
      <h3>{movie.Title}</h3>
      <Link onClick={handleChange} to="/results">
        View More
      </Link>
    </div>
  );
};

export default MovieSearch;