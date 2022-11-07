-- CreateTable
CREATE TABLE "Material" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(40) NOT NULL,
    "comment" VARCHAR(200) NOT NULL DEFAULT '',
    "typeId" TEXT NOT NULL,
    "lastUpdate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Material_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MaterialType" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(40) NOT NULL,
    "parentId" TEXT,

    CONSTRAINT "MaterialType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Material_name_key" ON "Material"("name");

-- CreateIndex
CREATE UNIQUE INDEX "MaterialType_name_key" ON "MaterialType"("name");

-- AddForeignKey
ALTER TABLE "Material" ADD CONSTRAINT "Material_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "MaterialType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaterialType" ADD CONSTRAINT "MaterialType_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "MaterialType"("id") ON DELETE SET NULL ON UPDATE CASCADE;
