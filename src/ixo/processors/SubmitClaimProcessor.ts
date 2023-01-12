import { prisma } from "../../prisma/prisma_client";
import { AbstractHandler } from "../../handlers/AbstractHandler";
import { Request } from "../../handlers/Request";
import { dateTimeLogger } from "../../logger/Logger";
import Cache from "../../Cache";
import { BlockchainMode } from "../common/shared";
import xss from "../../Xss";

export class SubmitClaimProcessor extends AbstractHandler {
    handleAsyncSubmitClaimResponse = async (jsonResponseMsg: any, retries?: number) => {
        try {
            const cached = await Cache.get(jsonResponseMsg.txHash);
            if (cached != undefined) {
                console.log(dateTimeLogger("updating the submit claim capabilities"));
                this.updateCapabilities(cached);
                console.log(dateTimeLogger("commit submit claim to Elysian"));
                const obj = {
                    ...cached.data,
                    txHash: jsonResponseMsg.txHash,
                    creator: cached.signature.creator,
                    created: cached.signature.created,
                };
                const sanitizedData = xss.sanitize(obj);
                const checkDuplicate = await prisma.claim.findFirst({ 
                    where: {
                        items: sanitizedData.items
                    },
                });
                if (checkDuplicate) {
                    console.log(dateTimeLogger("claim subsmission failed, duplicate found", true))
                    await prisma.evaluateClaim.create({
                        data: {
                            claimId: checkDuplicate.txHash,
                            projectDid: checkDuplicate.projectDid,
                            status: "DISPUTED",
                            txHash: jsonResponseMsg.txHash,
                            creator: cached.signature.creator,
                            created: cached.signature.created,
                            version: 0
                        },
                    });
                    return;
                };
                await prisma.claim.create({
                    data: {
                        claimTemplateId: sanitizedData.claim,
                        projectDid: cached.projectDid,
                        context: sanitizedData["@context"],
                        type: sanitizedData.type,
                        issuerId: sanitizedData.issuerId,
                        claimSubjectId: sanitizedData["claimSubject"]["id"],
                        items: sanitizedData.items,
                        dateTime: sanitizedData.dateTime,
                        txHash: sanitizedData.txHash,
                        creator: sanitizedData.creator,
                        created: sanitizedData.created,
                    },
                });
                console.log(dateTimeLogger("submit claim transaction completed successfully"))
            } else {
                let retry: number = retries || 0;
                if (retry <= 3) {
                    retry++;
                    setTimeout(() => {
                        console.log(dateTimeLogger(`retry cached submit claim transaction for ${jsonResponseMsg.txHash}`));
                        this.handleAsyncSubmitClaimResponse(jsonResponseMsg, retry)
                    }, 2000)
                } else {
                    //TODO we will want to get the transaction from the tranaction log and try the commit again. he transaction has already been accepted by the chain so we need to
                    //force the data into the DB
                    console.log(dateTimeLogger(`cached submit claim not found for transaction ${jsonResponseMsg.txHash}`, true));
                }
            };
        } catch (error) {
            //TODO we will want to get the transaction from the tranaction log and try the commit again. he transaction has already been accepted by the chain so we need to
            //force the data into the DB
            console.log(dateTimeLogger(`exception for cached transaction for ${jsonResponseMsg.txHash} not found`, true));
        };
    };

    updateCapabilities = (request: Request) => {
    };

    msgToPublish = (txHash: any, request: Request) => {
        return new Promise((resolve: Function, reject: Function) => {
            const data = {
                data: {
                    claimID: txHash,
                    claimTemplateID: request.data.claimTemplateId
                },
                txHash: txHash,
                senderDid: request.signature.creator,
                projectDid: request.projectDid
            };
            const sanitizedData = xss.sanitize(data);
            const msg = { type: "project/CreateClaim", value: sanitizedData };
            resolve(this.messageForBlockchain(msg, request.projectDid, BlockchainMode.block));
        });
    };

    process = (args: any) => {
        console.log(dateTimeLogger("start new Submit Claim transaction"));
        return this.createTransaction(args, "SubmitClaim", (request: any): Promise<boolean> => {
            return new Promise((resolve: Function, reject: Function) => {
                const validStatus = ["STARTED"];
                try {
                    prisma.projectStatus.findMany({
                        where: {
                            projectDid: request.data.projectDid
                        },
                        take: -1,
                    })
                    .then((results) => {
                        if (results.length > 0 && validStatus.some(elem => elem === results[0].status)) {
                            resolve(results[0]);
                        }
                        console.log(dateTimeLogger("Invalid Project Status. Valid statuses are " + validStatus.toString(), true))
                        reject("Invalid Project Status. Valid statuses are " + validStatus.toString())
                    })
                } catch (error) {
                    console.log(dateTimeLogger(error, true))
                    reject(error)
                }
            })
        });
    };
};

export default new SubmitClaimProcessor();