require('dotenv').config();
import * as http from 'http';
import cache from './Cache';
import mq from './MessageQ';
import App from './App';

var fs = require("fs");
var fileContent = Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
try {
  fs.readFileSync("/usr/src/app/pds.txt", 'utf8');
} catch (error) {
  fs.writeFile("./pds.txt", fileContent, (err: any) => {
    if (err) {
      console.error(err);
      return;
    };
    console.log("Elysian identifier " + fileContent);
  });
}

const BLOCKCHAIN_URI_REST = (process.env.BLOCKCHAIN_URI_REST || '');
console.log('Connecting to blockchain on: ' + BLOCKCHAIN_URI_REST);

var mongoose = require('mongoose');

require('mongoose').Promise = global.Promise;

// Set the port
const port = normalizePort(process.env.PORT || '');
App.set('port', port);
const server = http.createServer(App);

mongoose.connect(process.env.MONGODB_URI || '',
  { useCreateIndex: true, useNewUrlParser: true, reconnectTries: Number.MAX_VALUE, reconnectInterval: 1000, connectTimeoutMS: 2000, keepAlive: 1 })
  .catch(() => { });

cache.connect();
mq.connect().catch(() => { });

var db = mongoose.connection;
db.on('error', function (err: any) {
  if (err.message && err.message.match(/failed to connect to server .* on first connect/)) {
    console.log(new Date(), String(err));
    setTimeout(function () {
      console.log("Retrying first connect...");
      db.openUri(process.env.MONGODB_URI || '').catch(() => { });
    }, 5 * 1000);
  } else {
    console.error(new Date(), String(err));
  }
});

db.once('open', function () {
  console.log('MongDB connected');

  // Once connected listen on server
  server.listen(port);
  server.on('error', onError);
  server.on('listening', onListening);

});


process.on('SIGTERM', function () {
  console.log('Shut down');
  db.close();
  server.close(function () {
    process.exit(0);
  });
  cache.close();
  mq.connection.close();
});

function normalizePort(val: number | string): number | string | boolean {
  let port: number = (typeof val === 'string') ? parseInt(val, 10) : val;
  if (isNaN(port)) return val;
  else if (port >= 0) return port;
  else return false;
}

function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== 'listen') throw error;
  let bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;
  switch (error.code) {
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
  console.log(`App listening on ${bind}`);
}

