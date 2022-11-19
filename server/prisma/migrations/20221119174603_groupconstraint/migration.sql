/*
  Warnings:

  - You are about to drop the column `allowMembers` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the column `allowSubgroups` on the `Group` table. All the data in the column will be lost.
  - Made the column `memberId` on table `Membership` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Membership" DROP CONSTRAINT "Membership_memberId_fkey";

-- AlterTable
ALTER TABLE "Group" DROP COLUMN "allowMembers",
DROP COLUMN "allowSubgroups",

-- AlterTable
ALTER TABLE "Membership" ALTER COLUMN "memberId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
