const mongoose = require('mongoose');
// hashing passwords
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    maxLength: 50,
  },
  lastname: {
    type: String,
    required: true,
    maxLength: 50,
  },
  email: {
    type: String,
    required: true,
    minLength: 10,
    trim: true, //calls .trim() on the value to get rid of whitespace
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

// this function will be called before a document is saved
userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    // hash passwords
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

// Generate an auth token for the user
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, process.env.SECRET);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

userSchema.statics.findByCredentials = async (token, email, cb, password) => {
  // Search for a user by email and password.
  const user = await User.findOne({ email, token: token });
  if (!user) {
    throw new Error({ error: 'Invalid login credentials' });
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error({ error: 'Invalid login credentials' });
  }
  return user;
};

const User = mongoose.model('User', userSchema);

module.exports = { User };
