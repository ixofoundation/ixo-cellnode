var dateFormat = require('dateformat');

export const enum Status {
    created = "CREATED",
    pending = "PENDING",
    funded = "FUNDED",
    started = "STARTED",
    stopped = "STOPPED",
    payout = "PAIDOUT"
}

export function dateTimeLogger(): string {
    return dateFormat(new Date(), "yyyy-mm-dd hh:mm:ss:l");
  }