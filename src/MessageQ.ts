// import * as TransactionService from "./services/TransactionService";
// import UpdateProjectStatusProcessor from "./ixo/processors/UpdateProjectStatusProcessor";
// import { lookupProcessor } from "./handlers/RequestHandler";
// import { TransactionError } from "./error/TransactionError";
// import { dateTimeLogger } from "./logger/Logger";
// import Cache from "./Cache";
// import { Queue, Worker } from "bullmq";

// const connection = {
//     host: process.env.REDIS_HOST,
//     port: Number(process.env.REDIS_PORT)
// };

// const queue = new Queue("Messages", { connection });

// const worker = new Worker("Messages", async (job) => {
//     if (!job.data) return;
//     const jsonContent = JSON.parse(job.data);
//     try {
//         console.log(dateTimeLogger() + ` received response for ${jsonContent.msgType} with has ${jsonContent.txHash}`)
//         if (jsonContent.msgType === "eth") {
//             await UpdateProjectStatusProcessor.handleAsyncEthResponse(jsonContent);
//         } else if (jsonContent.msgType === "error") {
//             await TransactionService.updateTransactionLogForError(jsonContent.txHash, jsonContent.data);
//         } else {
//             const responseCode = jsonContent.data.code || 0;
//             const res = await TransactionService.updateTransactionLogForHash(jsonContent.txHash, jsonContent.data.txHash, jsonContent.data.height, responseCode);
//             console.log(dateTimeLogger() + ` transaction log updated with block information for txHash ${jsonContent.msgType} ${responseCode}`);
//             if (responseCode >= 1) {
//                 await TransactionService.updateTransactionLogForError(jsonContent.txHash, JSON.stringify(jsonContent.data));
//                 console.log(dateTimeLogger() + ` blockchain failed for message ${jsonContent.msgType} with code ${responseCode}`);
//             } else {
//                 console.log(dateTimeLogger() + ` process blockchain response for ${jsonContent.msgType} hash ${jsonContent.txHash}`);
//                 lookupProcessor[jsonContent.msgType](jsonContent);
//             };
//         };
//     } catch (error) {
//         console.log(dateTimeLogger() + " transaction log failed to update for txHash " + jsonContent.txHash);
//     };
// },
//     { connection },
// );

// export const publish = async (content: any) => {
//     try {
//         const jsonContent = JSON.stringify(content);
//         console.log(dateTimeLogger() + " cache object " + content.txHash);
//         Cache.set(content.txHash, content.request);
//         queue.add("Message", jsonContent);
//         return true;
//     } catch (error) {
//         throw new TransactionError("Queue exception " + error);
//     };
// };