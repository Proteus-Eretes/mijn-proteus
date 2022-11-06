-- CreateTable
CREATE TABLE "MaterialType" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(40) NOT NULL,
    "superId" TEXT,

    CONSTRAINT "MaterialType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MaterialType_name_key" ON "MaterialType"("name");

-- AddForeignKey
ALTER TABLE "MaterialType" ADD CONSTRAINT "MaterialType_superId_fkey" FOREIGN KEY ("superId") REFERENCES "MaterialType"("id") ON DELETE SET NULL ON UPDATE CASCADE;
