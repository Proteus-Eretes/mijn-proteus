-- CreateTable
CREATE TABLE "Quote" (
    "id" TEXT NOT NULL,
    "content" VARCHAR(120) NOT NULL,
    "by" VARCHAR(50) NOT NULL,

    CONSTRAINT "Quote_pkey" PRIMARY KEY ("id")
);