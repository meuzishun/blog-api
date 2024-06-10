require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
  mongoose.connection.on('connected', () => {
    console.log('Database connected');
  });
  await mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = {
  connectDB,
};
