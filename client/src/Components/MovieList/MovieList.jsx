import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API } from '../../utils/api';
import MoviesApi from '../../MoviesApi';
//import DetailsCard from '../DetailsCard/DetailsCard';
import ResultBody from '../ResultBody/ResultBody';
// import styles
import './MovieList.css';

const MovieList = () => {
  const [movie, setMovie] = useState('');

  let movieId = sessionStorage.getItem('movieId');

  useEffect(() => {
    getMovie(movieId);
  }, [movieId]);

  // getting movie with details
  const getMovie = async id => {
    const response = await axios.get(`https://www.omdbapi.com/?i=${id}&${API}`); // USE your api key here
    const movieDetails = response.data;
    setMovie(movieDetails);

    let res = await MoviesApi.getMovies();
    console.log(response);

    //setMovie(response);
    /*const { Title, Year, Genre, Actors, Plot, Awards, Poster } = res.data;*/

    // saving movie to database
    axios
      .post('http://localhost:5000/api/movie', movie)
      .then(response => {
        console.log(response);
        //this.history.push('/api/movie');
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <>
      <div className="movie-page">
        <h1>{movie.Title}</h1>
        <div className="movie-content">
          <div className="poster">
            <img src={movie.Poster} alt="" />
            <a
              className="bg-danger"
              href={`http://imdb.com/title/${movieId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              IMDB
            </a>

            <Link to="/movie">Back</Link>
          </div>
          <div>
            <p>
              <strong>Title: </strong>
              {movie.Title}
            </p>
            <p>
              <strong>Year: </strong>
              {movie.Year}
            </p>
            <p>
              <strong>Genre: </strong>
              {movie.Genre}
            </p>

            <p>
              <strong>Actors: </strong>
              {movie.Actors}
            </p>
            <p>
              <strong>Plot: </strong>
              {movie.Plot}
            </p>

            <p>
              <strong>Awards: </strong>
              {movie.Awards}
            </p>
            <div className="nav-wrapper">
              <a href="movie#/movie" className="brand-logo center" onClick={getMovie}>
                Save Movie
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <h4>Saved Database Movies</h4>
        <ResultBody />
      </div>
    </>
  );
};
export default MovieList;