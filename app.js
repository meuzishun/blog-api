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
  windowMs: 1 * 60 * 1000,
  max: 20,
});

const whitelist = [
  'https://meuzishun.github.io/blog-client-author',
  'https://meuzishun.github.io/blog-client',
  'https://meuzishun.github.io',
];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

const app = express();

app.use(limiter);
app.use(compression());
app.use(helmet());
app.use(cors(corsOptions));
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
