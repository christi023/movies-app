const { User } = require('../models/user');

let auth = (req, res, next) => {
  let token = req.header('x-auth-token');

  User.findOne({}, token, (err, user) => {
    if (err) throw err;
    if (!user)
      return res.json({
        isAuth: false,
        error: true,
      });

    if (!token)
      return res.status(401).json({ msg: 'No authentication token, authorization denied.' });

    req.token = token;
    req.user = user;
    next();
  });
};

//module.exports = { auth };
/*const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  User.findOne({}, (err, user) => {
    try {
      const token = req.header('x-auth-token');
      if (!token)
        return res.status(401).json({ msg: 'No authentication token, authorization denied.' });

      const verified = jwt.verify(token, process.env.SECRET);
      if (!verified)
        return res.status(401).json({ msg: 'Token verification failed, authorization denied.' });

      if (!user)
        return res.json({
          isAuth: false,
          error: true,
        });
      req.user = user;
      req.token = token;
      next();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  })
};*/

module.exports = { auth };
