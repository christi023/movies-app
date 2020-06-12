const express = require('express');
const router = express.Router();
// Models
const { User } = require('../models/user');

//------------------ USER AUTH ROUTE -----------------------

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

//-------------------- LOGOUT USER ROUTE ---------------------

module.exports = router;
