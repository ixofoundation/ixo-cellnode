import * as express from 'express';
import * as expressWinston from 'express-winston';
import * as winston from 'winston';

var dateFormat = require('dateformat');
export function dateTimeLogger(): string {
    return dateFormat(new Date(), "yyyy-mm-dd hh:mm:ss:l");
}

var consoleTransport = new winston.transports.Console({
  timestamp: true,
  json: false,
  colorize: true
});

winston.configure({
  transports: [
    consoleTransport
  ]
});

export let base = winston;

export let before = expressWinston.logger({
  winstonInstance: winston
});

export let after = expressWinston.errorLogger({
  winstonInstance: winston
});