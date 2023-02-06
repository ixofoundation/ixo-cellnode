import { readFileSync } from "fs";
import { prisma } from "../prisma/prisma_client";

let agentsErrors = 0;
const seedAgents = async () => {
    try {
        const agents = JSON.parse(
            readFileSync("src/seed/json_exports/agents.json").toString(),
        );
        for (const agent of agents) {
            try {
                await prisma.agent.create({
                    data: {
                        agentDid: agent.agentDid,
                        projectDid: agent.projectDid,
                        email: agent.email || "",
                        name: agent.name || "",
                        role: agent.role,
                        txHash: agent.txHash,
                        creator: agent._creator,
                        created: agent._created,
                    },
                });
            } catch (error) {
                console.log(error);
                agentsErrors++;
            }
        }
    } catch (error) {
        console.log(error);
        agentsErrors++;
    }
};

let agentStatusesErrors = 0;
const seedAgentStatuses = async () => {
    try {
        const agentStatuses = JSON.parse(
            readFileSync("src/seed/json_exports/agentstatuses.json").toString(),
        );
        for (const agentStatus of agentStatuses) {
            try {
                await prisma.agentStatus.create({
                    data: {
                        agentDid: agentStatus.agentDid,
                        projectDid: agentStatus.projectDid,
                        status: agentStatus.status,
                        role: agentStatus.role,
                        version: agentStatus.version,
                        txHash: agentStatus.txHash,
                        creator: agentStatus._creator,
                        created: agentStatus._created,
                    },
                });
            } catch (error) {
                console.log(error);
                agentStatusesErrors++;
            }
        }
    } catch (error) {
        console.log(error);
        agentStatusesErrors++;
    }
};

let capabilitiesErrors = 0;
const seedCapabilities = async () => {
    try {
        const capabilities = JSON.parse(
            readFileSync("src/seed/json_exports/capabilities.json").toString(),
        );
        for (const capability of capabilities) {
            try {
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
            } catch (error) {
                console.log(error);
                capabilitiesErrors++;
            }
        }
    } catch (error) {
        console.log(error);
        capabilitiesErrors++;
    }
};

let claimsErrors = 0;
const seedClaims = async () => {
    try {
        const claims = JSON.parse(
            readFileSync("src/seed/json_exports/claims.json").toString(),
        );
        for (const claim of claims) {
            try {
                await prisma.claim.create({
                    data: {
                        txHash: claim.txHash,
                        claimTemplateId: "",
                        projectDid: claim.projectDid,
                        context: claim["@context"],
                        type: claim.type,
                        issuerId: claim.issuerId,
                        claimSubjectId: claim.claimSubject.id,
                        items: JSON.stringify(claim.items),
                        dateTime: claim.dateTime,
                        creator: claim._creator,
                        created: claim._created,
                    },
                });
            } catch (error) {
                console.log(error);
                claimsErrors++;
            }
        }
    } catch (error) {
        console.log(error);
        claimsErrors++;
    }
};

let evaluateClaimsErrors = 0;
const seedEvaluateClaims = async () => {
    try {
        const evaluateClaims = JSON.parse(
            readFileSync(
                "src/seed/json_exports/evaluateclaims.json",
            ).toString(),
        );
        for (const evaluateClaim of evaluateClaims) {
            try {
                await prisma.evaluateClaim.create({
                    data: {
                        claimId: evaluateClaim.claimId,
                        projectDid: evaluateClaim.projectDid,
                        status: evaluateClaim.status,
                        txHash: evaluateClaim.txHash,
                        creator: evaluateClaim._creator,
                        created: evaluateClaim._created,
                        version: evaluateClaim.version,
                    },
                });
            } catch (error) {
                console.log(error);
                evaluateClaimsErrors++;
            }
        }
    } catch (error) {
        console.log(error);
        evaluateClaimsErrors++;
    }
};

let projectDocsErrors = 0;
const seedProjectDocs = async () => {
    try {
        const projectdocs = JSON.parse(
            readFileSync("src/seed/json_exports/projectdocs.json").toString(),
        );
        for (const projectdoc of projectdocs) {
            try {
                await prisma.projectDoc.create({
                    data: {
                        projectDid: projectdoc.projectDid,
                        txHash: projectdoc.txHash,
                        creator: projectdoc._creator,
                        created: projectdoc._created,
                        projectDoc: JSON.stringify(projectdoc),
                    },
                });
            } catch (error) {
                console.log(error);
                projectDocsErrors++;
            }
        }
    } catch (error) {
        console.log(error);
        projectDocsErrors++;
    }
};

let projectsErrors = 0;
const seedProjects = async () => {
    try {
        const projects = JSON.parse(
            readFileSync("src/seed/json_exports/projects.json").toString(),
        );
        for (const project of projects) {
            try {
                await prisma.project.create({
                    data: {
                        projectDid: project.projectDid,
                        projectData: JSON.stringify(project),
                        txHash: project.txHash,
                        creator: project._creator,
                        created: project._created,
                    },
                });
            } catch (error) {
                console.log(error);
                projectsErrors++;
            }
        }
    } catch (error) {
        console.log(error);
        projectsErrors++;
    }
};

let projectStatusesErrors = 0;
const seedProjectStatuses = async () => {
    try {
        const projectstatuses = JSON.parse(
            readFileSync(
                "src/seed/json_exports/projectstatuses.json",
            ).toString(),
        );
        for (const projectstatus of projectstatuses) {
            try {
                await prisma.projectStatus.create({
                    data: {
                        projectDid: projectstatus.projectDid,
                        status: projectstatus.status,
                        txHash: projectstatus.txHash,
                        creator: projectstatus._creator,
                        created: projectstatus._created,
                    },
                });
            } catch (error) {
                console.log(error);
                projectStatusesErrors++;
            }
        }
    } catch (error) {
        console.log(error);
        projectStatusesErrors++;
    }
};

let publicsErrors = 0;
const seedPublics = async () => {
    try {
        const publics = JSON.parse(
            readFileSync("src/seed/json_exports/publics.json").toString(),
        );
        for (const pub of publics) {
            try {
                await prisma.public.create({
                    data: {
                        key: pub.key,
                        contentType: pub.contentType,
                        data: Buffer.from(pub.data.$binary.base64, "base64"),
                    },
                });
            } catch (error) {
                console.log(error);
                publicsErrors++;
            }
        }
    } catch (error) {
        console.log(error);
        publicsErrors++;
    }
};

let transactionsErrors = 0;
const seedTransactions = async () => {
    try {
        const transactions = JSON.parse(
            readFileSync("src/seed/json_exports/transactions.json").toString(),
        );
        for (const transaction of transactions) {
            try {
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
            } catch (error) {
                console.log(error);
                transactionsErrors++;
            }
        }
    } catch (error) {
        console.log(error);
        transactionsErrors++;
    }
};

let walletsErrors = 0;
const seedWallets = async () => {
    try {
        const wallets = JSON.parse(
            readFileSync("src/seed/json_exports/wallets.json").toString(),
        );
        for (const wallet of wallets) {
            try {
                await prisma.wallet.create({
                    data: {
                        did: wallet.did,
                        signKey: wallet.signKey,
                        verifyKey: wallet.verifyKey,
                    },
                });
            } catch (error) {
                console.log(error);
                walletsErrors++;
            }
        }
    } catch (error) {
        console.log(error);
        walletsErrors++;
    }
};

const countRecords = async () => {
    try {
        const agents = await prisma.agent.count();
        const agentStatuses = await prisma.agentStatus.count();
        const capabilities = await prisma.capability.count();
        const claims = await prisma.claim.count();
        const evaluateClaims = await prisma.evaluateClaim.count();
        const projectDocs = await prisma.projectDoc.count();
        const projects = await prisma.project.count();
        const projectStatuses = await prisma.projectStatus.count();
        const publics = await prisma.public.count();
        const transactions = await prisma.transaction.count();
        const wallets = await prisma.wallet.count();

        console.log({
            Succeeded: {
                agents,
                agentStatuses,
                capabilities,
                claims,
                evaluateClaims,
                projectDocs,
                projects,
                projectStatuses,
                publics,
                transactions,
                wallets,
            },
            Failed: {
                agents: agentsErrors,
                agentStatuses: agentStatusesErrors,
                capabilities: capabilitiesErrors,
                claims: claimsErrors,
                evaluateClaims: evaluateClaimsErrors,
                projectDocs: projectDocsErrors,
                projects: projectsErrors,
                projectStatuses: projectStatusesErrors,
                publics: publicsErrors,
                transactions: transactionsErrors,
                wallets: walletsErrors,
            },
        });
    } catch (error) {
        console.log(error);
    }
};

// seedProjects();
// seedProjectDocs();
// seedProjectStatuses();
// seedCapabilities();
// seedAgents();
// seedAgentStatuses();
// seedClaims();
// seedPublics();
// seedTransactions();
// seedWallets();
// seedEvaluateClaims();

// countRecords();
