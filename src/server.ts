require('dotenv').config();
import * as http from 'http';
//import * as logger from './logger/Logger';

import App from './App';

var mongoose = require('mongoose');
require('mongoose').Promise = global.Promise;

// Set the port
const port = normalizePort(process.env.PORT || '');
App.set('port', port);
const server = http.createServer(App);

// Connect to Mongo DB
//mongoose.connect('mongodb://localhost:27017/pds')
mongoose.connect(process.env.MONGODB_URI || '');

var db = mongoose.connection;
db.on('error', function (err: any) {
  // If first connect fails because mongod is down, try again later.
  // This is only needed for first connect, not for runtime reconnects.
  // See: https://github.com/Automattic/mongoose/issues/5169
  if (err.message && err.message.match(/failed to connect to server .* on first connect/)) {
      console.log(new Date(), String(err));
      // Wait for a bit, then try to connect again
      setTimeout(function () {
          console.log("Retrying first connect...");
          db.openUri(process.env.MONGODB_URI || '').catch(() => {});
          // Why the empty catch?
          // Well, errors thrown by db.open() will also be passed to .on('error'),
          // so we can handle them there, no need to log anything in the catch here.
          // But we still need this empty catch to avoid unhandled rejections.
      }, 5 * 1000);
  } else {
      // Some other error occurred.  Log it.
      console.error(new Date(), String(err));
  }
});

db.once('open', function() {
  console.log('MongDB connected!');

  // Once connected listen on server
  server.listen(port);
  server.on('error', onError);
  server.on('listening', onListening);

});

process.on('SIGTERM', function () {
  db.close();
  server.close(function () {
    process.exit(0);
  });
});

function normalizePort(val: number|string): number|string|boolean {
  let port: number = (typeof val === 'string') ? parseInt(val, 10) : val;
  if (isNaN(port)) return val;
  else if (port >= 0) return port;
  else return false;
}

function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== 'listen') throw error;
  let bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;
  switch(error.code) {
    case 'EACCES':
      console.log(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.log(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening(): void {
  let addr = server.address();
  let bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
  console.log(`Listening on ${bind}`);
}

