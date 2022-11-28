-- CreateEnum
CREATE TYPE "SyncType" AS ENUM ('MEMBER');

-- CreateTable
CREATE TABLE "Sync" (
    "id" UUID NOT NULL,
    "type" "SyncType" NOT NULL,
    "nextAttempt" TIMESTAMP(3),

    CONSTRAINT "Sync_pkey" PRIMARY KEY ("id","type")
);
