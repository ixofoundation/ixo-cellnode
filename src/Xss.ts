const xssFilters = require('xss-filters');
const _ = require('lodash');

export class xss {

  sanitizeString = (data: string) => {
    return xssFilters['inHTMLData'](data);
  };

  sanitize = (obj: any) => {
    const self = this;

    if (_.isString(obj)) {
      return this.sanitizeString(obj);
    }
    if (_.isPlainObject(obj)) {
      const ret: any = {};

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
