require('dotenv').config();
const fs = require('fs');
const path = require('path');
const jsonwebtoken = require('jsonwebtoken');

const pathToPrivKey = path.join(__dirname, '..', '/config/id_rsa_priv.pem');
const pathToPubKey = path.join(__dirname, '..', '/config/id_rsa_pub.pem');
const PRIV_KEY = fs.readFileSync(pathToPrivKey, 'utf8');
const PUB_KEY = fs.readFileSync(pathToPubKey, 'utf8');

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
  const decoded = jsonwebtoken.verify(token, PUB_KEY);
  return decoded.sub;
}

module.exports = {
  issueJWT,
  getUserIdFromJWT,
};
