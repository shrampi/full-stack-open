const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const blogRouter = require('./controllers/blog');
const config = require('./utils/config');
const logger = require('./utils/logger');

const app = express();

const mongoUrl = config.MONGODB_URI;

mongoose.connect(mongoUrl)
  .then(() => logger.info('connected to mongoDB'))
  .catch((error) => logger.error('error connecting to mongoDB: ', error));

app.use(cors());
app.use(express.static('build'));
app.use(express.json());

app.use('/api/blogs', blogRouter);

module.exports = app;
