import { prisma } from "../prisma/prisma_client";

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
