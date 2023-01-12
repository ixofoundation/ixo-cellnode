import {dateTimeLogger} from './logger/Logger';
import {TransactionError} from "./error/TransactionError";

const Memcached = require('memcached');

let cache: any;

export class Cache {
  host: string;

  constructor() {
    this.host = (process.env.MEMCACHE_URI || '');
    cache = new Memcached(this.host, {reconnect: 5000, timeout: 1000, retry: 5000, retries: 1});
  }

  connect(): any {
    cache.connect(this.host, function (err: any, conn: any) {
      cache.on('failure', function (details: any) {
        console.log("Server " + details.server + " went down due to: " + details.messages.join(''))
      });
      cache.on('reconnecting', function (details: any) {
        console.log("Attempting reconnect to Memcached")
      });
      if (err) throw new TransactionError(err);
      console.log('Memcached connected');
    });
  }

  get(key: string): Promise<any> {
    return new Promise((resolve: Function, reject: Function) => {
      cache.get(key, function (err: any, data: any) {
        if (err) reject(err);
        resolve(data);
      });
    });
  }

  set(key: string, value: any, ttl: number = 0) {
    cache.set(key, value, ttl, function (err: any) {
      if (err) console.log(dateTimeLogger(' Memcached could not set value for key ' + key, true));
    });
  }

  close() {
    cache.end();
  }
}

export default new Cache();
