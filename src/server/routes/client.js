const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../config/authentication');

const User = mongoose.model('User');
const util = require('util');

// middleware that is specific to this router
// router.use(function timeLog(req, res, next) {
//   console.log("Time: ", Date.now());
//   next();
// });

// POST new user route (optional, everyone has access)
router.post('/signup', auth.optional, async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username) {
      return res.status(422).json({
        errors: {
          username: 'is required',
        },
      });
    }

    if (!password) {
      return res.status(422).json({
        errors: {
          password: 'is required',
        },
      });
    }

    const user = new User({ username });
    user.setPassword(password);
    await user.save();
    return res.json({ user: user.toAuthJSON() });
  } catch (err) {
    res.status(err.statusCode || 502).json(err.error || err);
  }
});

// POST login route (optional, everyone has access)
router.post('/signin', auth.optional, async (req, res, next) => {
  const {
    body: { username, password },
  } = req;

  if (!username) {
    return res.status(422).json({
      errors: {
        username: 'is required',
      },
    });
  }

  if (!password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  return passport.authenticate(
    'local',
    { session: false },
    (err, passportUser, info) => {
      console.log(util.inspect(info));
      if (err) return next(err);

      if (passportUser) {
        const user = passportUser;
        user.token = passportUser.generateJWT();
        return res.json({ user: user.toAuthJSON() });
      }
      console.log(`error is: ${util.inspect(info)}`);
      res.status(400).json(info);
    },
  )(req, res, next);
});

module.exports = router;
