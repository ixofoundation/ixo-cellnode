require('dotenv').config();
import * as http from 'http';
//import * as logger from './logger/Logger';
//import * as mongoose from 'mongoose';

import App from './App';

// Set the port
const port = normalizePort(process.env.PORT || '');
App.set('port', port);
const server = http.createServer(App);

// Connect to Mongo DB
//Set mongoose Pormise
var mongoose = require('mongoose');
//require('mongoose').Promise = global.Promise;

//mongoose.connect('mongodb://mongo:27017/pds')
mongoose.connect('mongodb://localhost:27017/pds')
//mongoose.connect(process.env.MONGODB_URI || '', { useMongoClient: true });


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongo connection error: Cannot start'));
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

