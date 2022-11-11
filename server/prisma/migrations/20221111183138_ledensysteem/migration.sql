/*
  Warnings:

  - The primary key for the `Material` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `MaterialType` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `parentId` column on the `MaterialType` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `id` on the `Material` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `typeId` on the `Material` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `MaterialType` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ContactType" AS ENUM ('EMAIL', 'INSTAGRAM', 'LINKEDIN', 'EMERGENCY', 'PHONE', 'WHATSAPP');

-- CreateEnum
CREATE TYPE "Institution" AS ENUM ('ERASMUS_UNIVERSITY_ROTTERDAM', 'FREE_UNIVERSITY_OF_AMSTERDAM', 'HAGUE_UNIVERSITY_OF_APPLIED_SCIENCES', 'INHOLLAND_UNIVERSITY_OF_APPLIED_SCIENCES', 'LEIDEN_UNIVERSITY', 'OPEN_UNIVERSITY', 'RADBOUD_UNIVERSITY', 'RIJKSUNIVERSITEIT_GRONINGEN', 'TILBURG_UNIVERSITY', 'UNIVERSITY_OF_AMSTERDAM', 'UNIVERSITY_OF_MAASTRICHT', 'UNIVERSITY_OF_TECHNOLOGY_DELFT', 'UNIVERSITY_OF_TECHNOLOGY_EINDHOVEN', 'UNIVERSITY_OF_TECHNOLOGY_TWENTE', 'UTRECHT_UNIVERSITY', 'WAGENINGEN_UNIVERSITY');

-- CreateEnum
CREATE TYPE "NameTitle" AS ENUM ('BACC', 'BC', 'DRS', 'DR', 'DRHC', 'ING', 'IR', 'KAND', 'MR', 'PROF');

-- CreateEnum
CREATE TYPE "Permission" AS ENUM ('ADMIN', 'MANAGE_GROUPS', 'MANAGE_PERMISSIONS', 'MANAGE_MATERIALS');

-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "StudyLevel" AS ENUM ('ASSOCIATE_DEGREE', 'BACHELOR_OF_SCIENCE', 'MASTER_OF_SCIENCE', 'BACHELOR_OF_ARTS', 'MASTER_OF_ARTS', 'BACHELOR_OF_LAWS', 'MASTER_OF_LAWS', 'DOCTORATE');

-- DropForeignKey
ALTER TABLE "Material" DROP CONSTRAINT "Material_typeId_fkey";

-- DropForeignKey
ALTER TABLE "MaterialType" DROP CONSTRAINT "MaterialType_parentId_fkey";

-- AlterTable
ALTER TABLE "Material" DROP CONSTRAINT "Material_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
DROP COLUMN "typeId",
ADD COLUMN     "typeId" UUID NOT NULL,
ADD CONSTRAINT "Material_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "MaterialType" DROP CONSTRAINT "MaterialType_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
DROP COLUMN "parentId",
ADD COLUMN     "parentId" UUID,
ADD CONSTRAINT "MaterialType_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "Address" (
    "id" UUID NOT NULL,
    "street" VARCHAR(40) NOT NULL,
    "number" VARCHAR(40) NOT NULL,
    "city" VARCHAR(40) NOT NULL,
    "zipcode" VARCHAR(20) NOT NULL,
    "country" VARCHAR(40) NOT NULL,
    "memberId" UUID NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" UUID NOT NULL,
    "value" VARCHAR(120) NOT NULL,
    "type" "ContactType" NOT NULL,
    "memberId" UUID,
    "groupId" UUID,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Group" (
    "id" UUID NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" VARCHAR(120) NOT NULL DEFAULT '',
    "startDate" DATE NOT NULL DEFAULT CURRENT_DATE,
    "stopDate" DATE NOT NULL DEFAULT CURRENT_DATE,
    "permissions" "Permission"[],
    "parentId" UUID,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Membership" (
    "id" UUID NOT NULL,
    "function" VARCHAR(50) NOT NULL DEFAULT '',
    "startDate" DATE NOT NULL DEFAULT CURRENT_DATE,
    "stopDate" DATE,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "memberId" UUID,
    "groupId" UUID NOT NULL,

    CONSTRAINT "Membership_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Member" (
    "id" UUID NOT NULL,
    "title" "NameTitle" NOT NULL,
    "initials" VARCHAR(10) NOT NULL,
    "firstName" VARCHAR(40) NOT NULL,
    "insertion" VARCHAR(10) NOT NULL DEFAULT '',
    "lastName" VARCHAR(40) NOT NULL,
    "dateOfBirth" DATE NOT NULL,
    "sex" "Sex" NOT NULL,
    "permissions" "Permission"[],

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MemberStudy" (
    "id" UUID NOT NULL,
    "studentNumber" VARCHAR(40) NOT NULL DEFAULT '',
    "startDate" DATE NOT NULL,
    "stopDate" DATE,
    "memberId" UUID NOT NULL,
    "studyId" UUID NOT NULL,

    CONSTRAINT "MemberStudy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Study" (
    "id" UUID NOT NULL,
    "name" VARCHAR(40) NOT NULL,
    "level" "StudyLevel" NOT NULL,
    "institution" "Institution" NOT NULL,

    CONSTRAINT "Study_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_group_visibility" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Address_memberId_key" ON "Address"("memberId");

-- CreateIndex
CREATE UNIQUE INDEX "_group_visibility_AB_unique" ON "_group_visibility"("A", "B");

-- CreateIndex
CREATE INDEX "_group_visibility_B_index" ON "_group_visibility"("B");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemberStudy" ADD CONSTRAINT "MemberStudy_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemberStudy" ADD CONSTRAINT "MemberStudy_studyId_fkey" FOREIGN KEY ("studyId") REFERENCES "Study"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Material" ADD CONSTRAINT "Material_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "MaterialType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaterialType" ADD CONSTRAINT "MaterialType_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "MaterialType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_group_visibility" ADD CONSTRAINT "_group_visibility_A_fkey" FOREIGN KEY ("A") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_group_visibility" ADD CONSTRAINT "_group_visibility_B_fkey" FOREIGN KEY ("B") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;
