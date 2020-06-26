const express = require('express');
const router = express.Router();
// Models
const { User } = require('../models/user');
const { auth } = require('../middleware/auth');

//------------------ USER AUTH ROUTE -----------------------
router.get('/api/users/auth', auth, async (req, res) => {
  try {
    res.status(200).json({
      isAuth: true,
      email: req.user.email,
      name: req.user.name,
      lastname: req.user.lastname,
      history: req.user.history,
    });
  } catch (error) {
    return error;
  }
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

    if (!user) {
      return res.status(401).send({ error: 'Login failed! Check authentication credentials' });
    }
    const token = await user.generateAuthToken();
    res.cookie('w_auth', token).status(200).json({
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
