const express = require('express');
const cors = require('cors');
require('express-async-errors');
const mongoose = require('mongoose');
const blogRouter = require('./controllers/blog');
const userRouter = require('./controllers/user');
const config = require('./utils/config');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');

const app = express();

const mongoUrl = config.MONGODB_URI;

mongoose.connect(mongoUrl)
  .then(() => logger.info('connected to mongoDB'))
  .catch((error) => logger.error('error connecting to mongoDB: ', error));

app.use(cors());
app.use(express.static('build'));
app.use(express.json());

app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);

app.use(middleware.requestLogger);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
