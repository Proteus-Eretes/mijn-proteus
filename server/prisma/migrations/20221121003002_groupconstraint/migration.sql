/*
  Warnings:

  - You are about to drop the column `allowMembers` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the column `allowSubgroups` on the `Group` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name,level,institution]` on the table `Study` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Group" DROP COLUMN "allowMembers",
DROP COLUMN "allowSubgroups";

-- CreateIndex
CREATE UNIQUE INDEX "Study_name_level_institution_key" ON "Study"("name", "level", "institution");
