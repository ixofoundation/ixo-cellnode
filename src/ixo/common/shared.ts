export const enum Status {
    created = "CREATED",
    pending = "PENDING",
    funded = "FUNDED",
    started = "STARTED",
    stopped = "STOPPED",
    payout = "PAIDOUT"
}

export const workflow = ["CREATED", "PENDING", "FUNDED", "STARTED", "STOPPED", "PAIDOUT"];