import { readFileSync } from "fs";
import { prisma } from "../prisma/prisma_client";

const capabilities = JSON.parse(
    readFileSync("src/seed/json_exports/capabilities.json").toString(),
);
const projectdocs = JSON.parse(
    readFileSync("src/seed/json_exports/projectdocs.json").toString(),
);
const projects = JSON.parse(
    readFileSync("src/seed/json_exports/projects.json").toString(),
);
const projectstatuses = JSON.parse(
    readFileSync("src/seed/json_exports/projectstatuses.json").toString(),
);
const publics = JSON.parse(
    readFileSync("src/seed/json_exports/publics.json").toString(),
);
const transactions = JSON.parse(
    readFileSync("src/seed/json_exports/transactions.json").toString(),
);
const wallets = JSON.parse(
    readFileSync("src/seed/json_exports/wallets.json").toString(),
);

const seedCapabilities = async () => {
    try {
        for (const capability of capabilities) {
            for (const cap of capability.capabilities) {
                await prisma.capability.create({
                    data: {
                        projectDid: capability.projectDid,
                        capability: cap.capability,
                        template: cap.template,
                        allow: cap.allow,
                        validateKYC: cap.validateKYC,
                    },
                });
            }
        }
    } catch (error) {
        console.log(error);
    }
};

const seedProjectdocs = async () => {
    try {
        for (const projectdoc of projectdocs) {
            await prisma.projectDoc.create({
                data: {
                    projectDid: projectdoc.projectDid,
                    txHash: projectdoc.txHash,
                    creator: projectdoc.createdBy || "",
                    created: projectdoc.createdOn || "",
                    projectDoc: JSON.stringify(projectdoc),
                },
            });
        }
    } catch (error) {
        console.log(error);
    }
};

const seedProjects = async () => {
    try {
        for (const project of projects) {
            await prisma.project.create({
                data: {
                    projectDid: project.projectDid,
                    txHash: project.txHash,
                    creator: project.createdBy || "",
                    created: project.createdOn || "",
                },
            });
        }
    } catch (error) {
        console.log(error);
    }
};

const seedProjectstatuses = async () => {
    try {
        for (const projectstatus of projectstatuses) {
            await prisma.projectStatus.create({
                data: {
                    projectDid: projectstatus.projectDid,
                    status: projectstatus.status,
                    txHash: projectstatus.txHash,
                    creator: projectstatus._creator,
                    created: projectstatus._created,
                },
            });
        }
    } catch (error) {
        console.log(error);
    }
};

const seedPublics = async () => {
    try {
        for (const pub of publics) {
            await prisma.public.create({
                data: {
                    key: pub.key,
                    contentType: pub.contentType,
                    data: pub.data.$binary.base64,
                },
            });
        }
    } catch (error) {
        console.log(error);
    }
};

const seedTransactions = async () => {
    try {
        for (const transaction of transactions) {
            await prisma.transaction.create({
                data: {
                    hash: transaction.hash,
                    projectDid: transaction.projectDid,
                    data: transaction.data,
                    nonce: transaction.nonce,
                    signatureType: transaction.signatureType,
                    signatureValue: transaction.signatureValue,
                    timestamp:
                        new Date(
                            Number(transaction.timestamp.$date.$numberLong),
                        ) || new Date(),
                    capability: transaction.capability,
                    blockHeight: transaction.blockHeight,
                    blockHash: transaction.blockHash,
                    blockResponeCode: transaction.blockResponseCode,
                    blockError: transaction.blockError,
                },
            });
        }
    } catch (error) {
        console.log(error);
    }
};

const seedWallets = async () => {
    try {
        for (const wallet of wallets) {
            await prisma.wallet.create({
                data: {
                    did: wallet.did,
                    signKey: wallet.signKey,
                    verifyKey: wallet.verifyKey,
                },
            });
        }
    } catch (error) {
        console.log(error);
    }
};

// seedCapabilities();
// seedProjectdocs();
// seedProjects();
// seedProjectstatuses();
// seedPublics();
// seedTransactions();
// seedWallets();
