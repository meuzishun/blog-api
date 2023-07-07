const crypto = require('crypto');
// const fs = require('fs');
// const path = require('path');
const s3 = require('../config/storage');

async function genKeyPair() {
  const keyPair = crypto.generateKeyPairSync('rsa', {
    modulusLength: 4096, // bits - standard for RSA keys
    publicKeyEncoding: {
      type: 'pkcs1', // "Public Key Cryptography Standards 1"
      format: 'pem', // Most common formatting choice
    },
    privateKeyEncoding: {
      type: 'pkcs1', // "Public Key Cryptography Standards 1"
      format: 'pem', // Most common formatting choice
    },
  });

  // const configDir = path.join(__dirname, '..', '/config/');
  // fs.writeFileSync(configDir + 'id_rsa_pub.pem', keyPair.publicKey);
  // fs.writeFileSync(configDir + 'id_rsa_priv.pem', keyPair.privateKey);

  await s3
    .putObject({
      Body: keyPair.publicKey,
      Bucket: 'cyclic-calm-gold-ox-gear-us-east-2',
      Key: 'id_rsa_pub.pem',
    })
    .promise();

  await s3
    .putObject({
      Body: keyPair.privateKey,
      Bucket: 'cyclic-calm-gold-ox-gear-us-east-2',
      Key: 'id_rsa_priv.pem',
    })
    .promise();

  console.log('genKeyPair called');
}

genKeyPair();
