-- CreateTable
CREATE TABLE "ClaimQueue" (
    "id" SERIAL NOT NULL,
    "request" JSONB,

    CONSTRAINT "ClaimQueue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Capability" (
    "id" SERIAL NOT NULL,
    "projectDid" TEXT NOT NULL,
    "capability" TEXT NOT NULL,
    "template" TEXT NOT NULL,
    "allow" TEXT[],
    "validateKYC" BOOLEAN,

    CONSTRAINT "Capability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Public" (
    "key" TEXT NOT NULL,
    "contentType" TEXT NOT NULL,
    "data" TEXT NOT NULL,

    CONSTRAINT "Public_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "Storage" (
    "cid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "ipfs" TEXT NOT NULL,

    CONSTRAINT "Storage_pkey" PRIMARY KEY ("cid")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "hash" TEXT NOT NULL,
    "projectDid" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "nonce" TEXT NOT NULL,
    "signatureType" TEXT NOT NULL,
    "signatureValue" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "capability" TEXT NOT NULL,
    "blockHeight" TEXT,
    "blockHash" TEXT,
    "blockResponeCode" INTEGER,
    "blockError" TEXT,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("hash")
);

-- CreateTable
CREATE TABLE "Wallet" (
    "did" TEXT NOT NULL,
    "signKey" TEXT NOT NULL,
    "verifyKey" TEXT NOT NULL,

    CONSTRAINT "Wallet_pkey" PRIMARY KEY ("did")
);

-- CreateTable
CREATE TABLE "Agent" (
    "agentDid" TEXT NOT NULL,
    "projectDid" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "txHash" TEXT NOT NULL,
    "creator" TEXT NOT NULL,
    "created" TEXT NOT NULL,

    CONSTRAINT "Agent_pkey" PRIMARY KEY ("agentDid")
);

-- CreateTable
CREATE TABLE "AgentStatus" (
    "id" SERIAL NOT NULL,
    "agentDid" TEXT NOT NULL,
    "projectDid" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "txHash" TEXT NOT NULL,
    "creator" TEXT NOT NULL,
    "created" TEXT NOT NULL,

    CONSTRAINT "AgentStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Claim" (
    "txHash" TEXT NOT NULL,
    "claimTemplateId" TEXT NOT NULL,
    "projectDid" TEXT NOT NULL,
    "context" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "issuerId" TEXT NOT NULL,
    "claimSubjectId" TEXT NOT NULL,
    "items" JSONB,
    "dateTime" TEXT NOT NULL,
    "creator" TEXT NOT NULL,
    "created" TEXT NOT NULL,

    CONSTRAINT "Claim_pkey" PRIMARY KEY ("txHash")
);

-- CreateTable
CREATE TABLE "EvaluateClaim" (
    "id" SERIAL NOT NULL,
    "claimId" TEXT NOT NULL,
    "projectDid" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "txHash" TEXT NOT NULL,
    "creator" TEXT NOT NULL,
    "created" TEXT NOT NULL,
    "version" INTEGER NOT NULL,

    CONSTRAINT "EvaluateClaim_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "projectDid" TEXT NOT NULL,
    "projectData" JSONB,
    "txHash" TEXT NOT NULL,
    "creator" TEXT NOT NULL,
    "created" TEXT NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("projectDid")
);

-- CreateTable
CREATE TABLE "ProjectDoc" (
    "projectDid" TEXT NOT NULL,
    "projectDoc" JSONB,
    "txHash" TEXT NOT NULL,
    "creator" TEXT NOT NULL,
    "created" TEXT NOT NULL,

    CONSTRAINT "ProjectDoc_pkey" PRIMARY KEY ("projectDid")
);

-- CreateTable
CREATE TABLE "ProjectStatus" (
    "id" SERIAL NOT NULL,
    "projectDid" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "txHash" TEXT NOT NULL,
    "creator" TEXT NOT NULL,
    "created" TEXT NOT NULL,

    CONSTRAINT "ProjectStatus_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Transaction_hash_idx" ON "Transaction"("hash");

-- AddForeignKey
ALTER TABLE "AgentStatus" ADD CONSTRAINT "AgentStatus_agentDid_fkey" FOREIGN KEY ("agentDid") REFERENCES "Agent"("agentDid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvaluateClaim" ADD CONSTRAINT "EvaluateClaim_claimId_fkey" FOREIGN KEY ("claimId") REFERENCES "Claim"("txHash") ON DELETE RESTRICT ON UPDATE CASCADE;
