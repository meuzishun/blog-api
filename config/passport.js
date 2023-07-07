const fs = require('@cyclic.sh/s3fs');
const path = require('path');
const User = require('../models/user');
const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');

const pathToKey = path.join(__dirname, '..', '/config/id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ['RS256'],
};

const strategy = new Strategy(options, (payload, done) => {
  User.findOne({ _id: payload.sub })
    .then((user) => {
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
    .catch((err) => done(err, null));
});

passport.use(strategy);

const isAuth = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(400).json({ message: 'Unauthorized' });
      // req.user = null;
      return next();
    }

    if (user) {
      req.login(user, { session: false }, (err) => {
        if (err) {
          return next(err);
        }
        next();
      });
    }
  })(req, res, next);
};

const isAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    next();
  } else {
    res.status(400).json({
      msg: 'Only admin are allowed',
    });
  }
};

module.exports = {
  isAuth,
  isAdmin,
};
