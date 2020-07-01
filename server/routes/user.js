const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
// Models
const { User } = require('../models/user');
const { auth } = require('../middleware/auth');

//------------------ USER AUTH ROUTE -----------------------
router.get('/api/users/auth', auth, async (req, res) => {
  // get current user
  /* try {
    res.status(200).json({
      isAuth: true,
      email: req.user.email,
      password: req.user.password,
      firstname: req.user.name,
      lastname: req.user.lastname,
      id: user._id,
    });
  } catch (error) {
    return error;
  }*/
  const user = await User.findById(req.user);
  res.json({
    email: user.email,
    id: user._id,
  });
});

//------------------REGISTER USER ROUTE----------------------
router.post('/api/users/register', async (req, res) => {
  // Create a new user-register new user
  try {
    const user = new User(req.body);
    await user.save();
    //token
    const token = await user.generateAuthToken();
    return res.status(201).send({ user }).json({
      success: true,
    });
  } catch (error) {
    return error;
  }
});
// -------------------- LOGIN USER ROUTE ---------------------
router.post('/api/users/login', async (req, res) => {
  // Login a registered user
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    // validate
    if (!user) {
      return res.status(401).send({ error: 'Login failed! Check authentication credentials' });
    }
    const token = await user.generateAuthToken();
    //res.cookie('w_auth', token)
    return res.status(200).json({
      token,
      loginSuccess: true,
    });
  } catch (error) {
    return res.status(400).send(error);
  }
});

//-------------------- LOGOUT USER ROUTE ---------------------
router.get('/api/users/logout', auth, async (req, res) => {
  // Log user out of the application
  try {
    req.user._id = await User.findByIdAndUpdate({ _id: req.user._id }, { token: '' }, () => {
      return res.status(200).send({ logoutSuccess: true });
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
    });
  }
});

//------------------------ DELETE USER --------------------------
router.delete('/api/users/delete', auth, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user);
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/api/users/tokenIsValid', async (req, res) => {
  try {
    //"x-auth-token"
    const token = req.header('x-auth-token');
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/*router.post('/api/users/logoutall', auth, async (req, res) => {
  // Log user out of all devices
  try {
    // splice array method to remove tokens from users tokens array. Then save user document.
    req.user.tokens.splice(0, req.user.tokens.length);
    await req.user.save();
    res.send({ success: true });
  } catch (error) {
    res.status(500).send(error);
  }
});*/

module.exports = router;
