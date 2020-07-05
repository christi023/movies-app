import React, { useState, useEffect } from 'react';
import MovieSearch from '../MovieSearch/MovieSearch';
import { API } from '../../utils/api';
import axios from 'axios';
// styles
import './Movie.css';

const Movie = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getMovies();
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //Request Api for movies
    sessionStorage.setItem('movie', search);
    getMovies();
  };

  const getMovies = async () => {
    const movieName = sessionStorage.getItem('movie');
    if (movieName) {
      const response = await axios.get(`https://www.omdbapi.com/?s=${movieName}&${API}`); // place your api key here
      const movies = response.data;
      setMovies(movies.Search);
    }
  };

  return (
    <div>
      <div className="App1">
        <div className="jumbotron">
          <div className="container">
            <div className="row">
              <h2 className="col-12 text-center">Search Movie Here</h2>
              <form className="search-form" onSubmit={handleSubmit}>
                <input
                  className="search-bar"
                  type="text"
                  placeholder="Search For Movies"
                  value={search}
                  onChange={handleSearch}
                />
                <button className="search-button" type="submit">
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="movies-list">
        {movies && movies.length > 0 ? (
          movies.map((movie, index) => <MovieSearch key={index} movie={movie} />)
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};

export default Movie;
