const fs = require('fs');
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

const isAuth = passport.authenticate('jwt', { session: false });

module.exports = {
  isAuth,
};
