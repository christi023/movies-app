const mongoose = require('mongoose');

// Created a Movie schema for our movie info model
const movieSchema = mongoose.Schema({
  Title: {
    type: String,
    required: true,
  },
  Year: {
    type: Number,
  },
  Genre: {
    type: String,
  },
  Actors: {
    type: String,
  },
  Plot: {
    type: String,
    required: true,
  },
  Awards: {
    type: String,
  },
  Poster: {
    type: String,
  },
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = { Movie };
