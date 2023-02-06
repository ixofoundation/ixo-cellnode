import { prisma } from "../prisma/prisma_client";
import * as cron from "node-cron";
import { RequestLookupHandler } from "./RequestHandler";

export const checkDuplicate = async (items: string) => {
    const claim = await prisma.claim.findFirst({
        where: { items: JSON.parse(items) },
    });
    if (claim) {
        return true;
    } else {
        return false;
    }
};

export const createBatch = async (claims: any) => {
    try {
        for (const claim of claims) {
            await prisma.claimQueue.create({
                data: {
                    request: claim,
                },
            });
        }
        return "Batch Submitted";
    } catch (error) {
        return { error: error.toString() };
    }
};

export const listUnprocessed = async () => {
    try {
        return prisma.claimQueue.findMany();
    } catch (error) {
        return { error: error.toString() };
    }
};

cron.schedule("0 */5 * * * *", async () => {
    const claims = await prisma.claimQueue.findMany({ take: 50 });
    await prisma.claimQueue.deleteMany({
        where: {
            id: {
                in: [...Array(50)],
            },
        },
    });
    for (const claim of claims) {
        await RequestLookupHandler["submitClaim"](claim);
    }
});
