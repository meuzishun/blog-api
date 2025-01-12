require('dotenv').config();
const fs = require('fs');
const path = require('path');
const jsonwebtoken = require('jsonwebtoken');

const pathToKey = path.join(__dirname, '..', '/config/id_rsa_priv.pem');
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');

function issueJWT(user) {
  const _id = user._id;

  const expiresIn = '2h';

  const payload = {
    sub: _id,
  };

  const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, {
    expiresIn: expiresIn,
    algorithm: 'RS256',
  });

  return {
    token: 'Bearer ' + signedToken,
    expires: expiresIn,
  };
}

function getUserIdFromJWT(token) {
  const decoded = jsonwebtoken.verify(token, PRIV_KEY);
  return decoded.sub;
}

module.exports = {
  issueJWT,
  getUserIdFromJWT,
};
