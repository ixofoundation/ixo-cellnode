export const enum Status {
  created = "CREATED",
  pending = "PENDING",
  funded = "FUNDED",
  started = "STARTED",
  stopped = "STOPPED",
  payout = "PAIDOUT"
}

export const workflow = [undefined, "CREATED", "PENDING", "FUNDED", "STARTED", "STOPPED", "PAIDOUT"];

export const enum BlockchainMode { async = "async", sync = "sync", block = "block" }
