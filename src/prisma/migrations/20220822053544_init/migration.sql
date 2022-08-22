-- CreateTable
CREATE TABLE "Capability" (
    "id" SERIAL NOT NULL,
    "projectDid" TEXT NOT NULL,
    "capability" TEXT NOT NULL,
    "template" TEXT NOT NULL,
    "allow" TEXT[],
    "validateKYC" BOOLEAN NOT NULL,

    CONSTRAINT "Capability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Public" (
    "key" TEXT NOT NULL,
    "data" BYTEA NOT NULL,
    "contentType" TEXT NOT NULL,

    CONSTRAINT "Public_pkey" PRIMARY KEY ("key")
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

-- CreateIndex
CREATE INDEX "Transaction_hash_idx" ON "Transaction"("hash");
