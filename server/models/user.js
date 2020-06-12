import { Schema } from 'mongoose';
import { default as validator } from 'validator';
// hashing passwords
import { default as validator } from 'validator';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = Schema({
  name: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 50,
  },
  email: {
    type: String,
    required: true,
    minLength: 10,
    trim: true,
    unique: 1,
    validate: (value) => {
      if (!validator.isEmail(value)) {
        throw new Error({ error: 'Invalid Email Address' });
      }
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 5,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
