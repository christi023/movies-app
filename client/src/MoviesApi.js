// this file pertains all functions for our http request
//in external file

//1st function will return all our movies
export default {
  // get movies method
  getMovies: async () => {
    const res = await fetch('http://localhost:5000/api/movies');
    const data = await res.json();
    return data || [];
  },

  // delete method
  deleteMovie: async (_id) => {
    const res = await fetch(`/api/movie/${_id}`, {
      method: 'delete',
    });
    const data = await res.json();
    return data; // returns data
  },

  // update method
  updateMovie: async (movie) => {
    const res = await fetch(`/api/movie/${movie._id}`, {
      method: 'put',
      body: JSON.stringify(movie),
      headers: {
        'access-control-allow-origin': '*',
        'Content Type': 'application/json',
      },
    });
    const data = await res.json();
    return data; // then method is to return data
  },

  // create movie
  createMovie: async (movie) => {
    const res = await fetch(`/api/movie`, {
      method: 'post',
      body: JSON.stringify(movie),
      headers: {
        'access-control-allow-origin': '*',
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    return data;
  }, // then method is to return data},
};
