import { writeFileSync } from "fs";

const dateFormat = require('dateformat');

export function dateTimeLogger(text: string, error?: boolean): string {
  if (error) {
    writeFileSync('../errors.txt', `ERR-${dateFormat(new Date(), "yyyy-mm-dd hh:MM:ss:l")}: ${text}`)
    return `ERR-${dateFormat(new Date(), "yyyy-mm-dd hh:MM:ss:l")}: ${text}`
  }
  return `${dateFormat(new Date(), "yyyy-mm-dd hh:MM:ss:l")}: ${text}`;
}
