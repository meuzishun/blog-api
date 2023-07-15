require('dotenv').config();
if (process.env.NODE_ENV === 'production') {
  require('./lib/generateKeyPair');
}
const { connectDB } = require('./config/database');
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const routes = require('./routes/index');
const { errorHandler } = require('./middleware/errorHandler');
const compression = require('compression');
const helmet = require('helmet');
const RateLimit = require('express-rate-limit');
const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 20,
});

const app = express();

app.use(limiter);
app.use(compression());
app.use(helmet());
// app.use(
//   helmet({
//     crossOriginResourcePolicy: false,
//   })
// );
app.use(cors()); // TODO: Setup cors configuration (https://www.npmjs.com/package/cors)
app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes);
app.use(errorHandler);

connectDB().then(() => {
  app.listen(process.env.PORT, () =>
    console.log(`Server listening on port ${process.env.PORT}`)
  );
});
