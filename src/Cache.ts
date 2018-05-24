var Memcached = require('memcached');

var cache: any;

export class Cache {
    host: string;

    constructor() {
        this.host = (process.env.MEMCACHE_URI || '');
        cache = new Memcached(this.host);        
    }

    connect(): void {
        cache.connect(this.host, function (err: any, conn: any) {
            if (err) throw new Error(err);
            console.log('Memcache connected');
        });
    }

    get(key: string): Promise<any> {
        return new Promise((resolve: Function, reject: Function) => {
            cache.get(key, function (err: any, data: any) {
                if (err) throw new Error(err);
                console.log(new Date().getUTCMilliseconds() + ' got cached value ' + JSON.stringify(data));
                resolve(data);
            });
        });        
    }

    set(key: string, value: any) {
        cache.set(key, value, 0, function (err: any) {
            if (err) throw new Error(err);
        });
    }

    close() {
        cache.end();
    }

    timeToLive(sec: number): number {
        return sec * 1000;
    }
}

export default new Cache();