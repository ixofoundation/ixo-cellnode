var dateFormat = require('dateformat');
export function dateTimeLogger(): string {
    return dateFormat(new Date(), "yyyy-mm-dd hh:MM:ss:l");
}