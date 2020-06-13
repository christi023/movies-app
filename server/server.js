const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// router imports
const userRouter = require('./routes/user');
const movieRouter = require('./routes/movie');

const app = express();

// load env var
require('dotenv').config();

// express body parser adding middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// bring in mongoose - connect database
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
//console.log(process.env.DATABASE)

// enable cors
app.use(cors());

// ------- ROUTER -------- //
app.use(userRouter);
app.use(movieRouter);

// env variable port created
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`),
);
