var xssFilters = require('xss-filters');
var _ = require('lodash');

export class xss {

    sanitizeString = (data: string) => {
        return xssFilters['inHTMLData'](data);
    };

    sanitize = (obj: any) => {
        var self = this;

        if (_.isString(obj)) {
            return this.sanitizeString(obj);
        }
        if (_.isPlainObject(obj)) {
            var ret: any = {};

            Object.keys(obj).forEach(key => {
                ret[key] = self.sanitize(obj[key]);
            });
            return ret;
        }
        if (_.isArray(obj)) {
            return obj.map((x: any) => {
                return (self.sanitize(x))
            });
        }
        return obj;
    };

}

export default new xss();