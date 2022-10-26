const jwt = require('jsonwebtoken');
const logger = require('./logger')


const requestLogger = (request, response, next) => {
  logger.info('=== Begin Request ===');
  logger.info('Method:', request.method);
  logger.info('Path:  ', request.path);
  logger.info('Body:  ', request.body);
  logger.info('=====================');
  next();
};

const unknownEndpoint = (request, response, next) => {
  response.status(404).send({ error: 'unknown endpoint' });
  next();
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  }
  if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message });
  }
  if (error.name === 'JsonWebTokenError') {
    return response.status(401).send({ error: 'invalid token' });
  }

  next(error);
};

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization');
  if (authorization) {
    if (!authorization.toLowerCase().startsWith('bearer ')) {
      return response.status(401).send({ error: 'authorization must begin with "bearer"' });
    }
    logger.info('extracting token...');
    request.token = authorization.substring(7);
  }
  next();
}

const userExtractor = (request, response, next) => {
  if (request.token) {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!decodedToken.id) {
      return response.status(400).send({ error: 'token is missing or invalid' });
    }
    logger.info(`user ${decodedToken.username} extracted from token`);
    request.user = decodedToken.id;
  }
  next()
}

module.exports = {
  requestLogger, unknownEndpoint, errorHandler, tokenExtractor, userExtractor
};
