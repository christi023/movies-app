const express = require('express');
const router = express.Router();
// Models
const { Movie } = require('../models/movie');

// --------------- CRUD OPERATIONS ----------------

// READ ------>  Getting all movies
router.get('/api/movies', async (req, res) => {
  try {
    await Movie.find({}, (err, movies) => {
      if (err)
        res.status(500).json({
          message: {
            msgBody: 'Unable to get movies',
            msgError: true,
          },
        });
      return res.status(200).json({ success: true, data: movies });
    });
  } catch (err) {
    return err;
  }
});

// GET - Get movie by ID
router.get('/api/movie/:id', async (req, res) => {
  try {
    await Movie.findOne({ _id: req.params.id }, (err, movie) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }

      if (!movie) {
        return res.status(404).json({ success: false, error: `Movie not found` });
      }
      return res.status(200).json({ success: true, data: movie });
    });
  } catch (err) {
    return err;
  }
});

// CREATE --------> Post / Adding a new movie
router.post('/api/movie', async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save().then(() => {
      return (
        res
          .status(201)
          //.send(movie)
          .json({
            message: {
              msgBody: 'Movie added successfully',
              success: true,
            },
          })
      );
    });
  } catch (error) {
    return res.status(400).json({
      error,
      message: 'Movie not added',
    });
  }
});

// DELETE ---------> Deleting / Removing a movie
router.delete('/api/movie/:id', async (req, res) => {
  try {
    await Movie.findByIdAndDelete({ _id: req.params.id }, (err) => {
      if (err)
        res.status(400).json({
          message: {
            msgBody: 'Unable to Delete Movie',
            msgError: err,
            success: false,
          },
        });
      else
        return res.status(200).json({
          message: {
            msgBody: 'Successfully Deleted Movie',
            success: true, // since everything went well
          },
        });
    });
  } catch (err) {
    return err;
  }
});

// UPDATE --------> Updating
router.put('/api/movie/:id', async (req, res) => {
  try {
    await Movie.findOne({ _id: req.params.id }, (err, movie) => {
      if (err)
        return res.status(404).json({
          err,
          message: {
            msgBody: 'Unable to Update Movie',
            msgError: true,
          },
        });
      movie.save().then(() => {
        return res.status(200).json({
          message: {
            msgBody: 'Successfully Updated Movie',
            success: true, // since everything went well
          },
        });
      });
    });
  } catch (err) {
    return err;
  }
});

module.exports = router;
