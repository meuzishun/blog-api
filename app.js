require('dotenv').config();
// if (process.env.NODE_ENV === 'production') {
//   require('./lib/generateKeyPair');
// }
require('./config/database');
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const routes = require('./routes/index');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();

// TODO: Setup cors configuration (https://www.npmjs.com/package/cors)

app.use(cors());
app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes);
app.use(errorHandler);

app.listen(process.env.PORT, () =>
  console.log(`Server listening on port ${process.env.PORT}`)
);
