import path from 'path';
import _ from 'lodash';
import express from 'express';
import cookieParser from 'cookie-parser';
import routes from './routes';

// track connections so we can close them when server gets shutdown signal
const connections = [];

const notFound = function (req, res, next) {
  const url = decodeURI(req.url);
  const query = JSON.stringify(req.query);
  const { method } = req;
  const message = `404 Not found ${method} ${url} ${query}`;
  log.warn(message);

  const err = new Error(message);
  err.title = 'Not Found';
  err.status = 404;
  next(err);
};

const errorHandler = function (err, req, res, next) {
  const code = err.status || 500;
  const title = err.title || 'Error';
  const message = err.message || 'Error';
  const resObj = req.app.get('env') === 'development' ?
    { code, title, message, stack: err.stack }
    : { code, title, message };
  if (code != 404) {
    log.error(JSON.stringify(resObj, null, 2));
  }
  res.status(code);
  res.json(resObj);
};

module.exports = class Server {
  constructor(listenPort) {
    this.listenPort = listenPort;
    this.app = express();
    this.app.use(cookieParser());
    this.app.set('json spaces', 2);

    // serve login page
    this.app.use('/login-page', express.static(path.join(__dirname, '..', 'dist')));

    // setup routes
    this.app.use('/', routes);

    // catch 404 and forward to error handler
    this.app.use(notFound);

    // error handler
    this.app.use(errorHandler);

    // bind methods
    _.bindAll(this, 'start', 'stop', 'gracefulShutdown');
  }

  start() {
    if (this.server) return; // server already started
    log.info(`server listening port: ${this.listenPort}`);
    this.server = this.app.listen(this.listenPort);

    // track connections, remove them from array on close
    this.server.on('connection', connection => {
      connections.push(connection);
      connection.on('close', () => {
        const index = connections.indexOf(connection);
        if (index > -1) {
          connections.splice(index, 1);
        }
      });
    });

    // hook process signals for graceful express shutdown
    this.sigint = _.partial(this.gracefulShutdown, 'SIGINT');
    this.sigterm = _.partial(this.gracefulShutdown, 'SIGTERM');
    process.on('SIGINT', this.sigint);
    process.on('SIGTERM', this.sigterm);
  }

  stop() {
    const { server } = this;
    if (!server) return; // server not started
    log.info('stopping server');

    // unhook
    process.removeListener('SIGINT', this.sigint);
    process.removeListener('SIGTERM', this.sigterm);

    server.close(() => {
      this.server = null;
      log.info('server stopped');
    });
  }

  gracefulShutdown(signal) {
    log.warn(`graceful shutdown initiated ${signal}, destroying all connections`);
    connections.forEach(c => c.destroy());
    this.server.close(() => {
      // NOTE: 2018-06-02 DJY - due to issues with winston flushing, this last message may appear in console, but not file
      log.warn(`express stopped gracefully, exiting process now ${signal}`);
      process.exit(0);
    });
  }
};