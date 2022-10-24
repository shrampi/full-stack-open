const http = require('http');
const logger = require('./utils/logger');
const app = require('./app');
const config = require('./utils/config');

const server = http.createServer(app);

const PORT = config.PORT || 3000;
server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
