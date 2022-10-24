require('dotenv').config();

const { MONGODB_URI, PORT } = process.env;

module.exports = {
  PORT, MONGODB_URI,
};
