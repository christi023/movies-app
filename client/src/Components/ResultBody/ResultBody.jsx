import React, { Component } from 'react';
import DetailsCard from '../DetailsCard/Details';
//import ResultCard from '../ResultCard/ResultCard';
import API from '../../utils/api';
//import MoviesApi from '../../MoviesApi';

import axios from 'axios';

export default class ResultBody extends Component {
  constructor() {
    super();
    this.state = {
      results: [],
      searched: false,
      saved: false,
      movieTitle: '',
      movieYear: '',
      movies: [],
      _id: '',
      Title: '',
      Year: '',
      Genre: '',
      Plot: '',
      Actors: '',
      Awards: '',
      Poster: '',
    };

    this.delete = this.delete.bind(this);
  }
  searchMovie = (title, year) => {
    API.search(title, year)
      .then((res) => this.setState({ results: res.data }))
      .catch((err) => console.log(err));
  };

  apiSearch = (event) => {
    event.preventDefault();
    this.searchMovie(this.state.Title, this.state.Year);
  };

  inputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value,
    });
  };

  getMovies = () => {
    axios.get('/api/movies').then((movies) => {
      // console.log('got movies');
      console.log(movies.data);

      this.setState({
        movies: movies.data,
      });
    });
  };

  componentDidMount() {
    this.getMovies();
  }

  delete = (movieId) => {
    const movies = this.state.movies.filter((movies) => movies._id !== movieId);
    this.setState({ movies: movies });
    //alert('clicked');
  };

  render() {
    //console.log(this.state.results);
    //console.log(this.state.movies);
    const { movies } = this.state;

    return (
      <div>
        <div className="container">
          <div className="row topRow z-depth-5">
            {movies && movies.length > 0 ? (
              this.state.movies.map((movies) => (
                <DetailsCard
                  key={movies._id}
                  Title={movies.Title}
                  Year={movies.Year}
                  Genre={movies.Genre}
                  Plot={movies.Plot}
                  Poster={movies.Poster}
                  Actors={movies.Actors}
                  Awards={movies.Awards}
                  id={movies._id}
                  input={this.inputChange}
                  save={this.saveNote}
                  delete={this.delete}
                />
              ))
            ) : (
              <p></p>
            )}
          </div>
        </div>

        <footer className="page-footer">
          <div className="footer-copyright">
            <div className="container">Made By Sheliann © 2020</div>
          </div>
        </footer>
      </div>
    );
  }
}
