const httpServer = require('./server');
const routes = require('./routes');

module.exports = () => httpServer(routes);
