import * as TransactionService from "../services/TransactionService";
import * as CapabilitiesService from "../services/CapabilityService";

export const queryTransactions = async () => {
    return TransactionService.findTransactions();
};

export const queryCapabilities = async () => {
    return CapabilitiesService.findCapabilities();
};