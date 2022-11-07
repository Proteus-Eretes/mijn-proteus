-- CreateEnum
CREATE TYPE "ContactType" AS ENUM ('EMAIL', 'INSTAGRAM', 'LINKEDIN', 'PARENT', 'PHONE', 'WHATSAPP');

-- CreateEnum
CREATE TYPE "GroupType" AS ENUM ('ASSOCIATION', 'COACHES', 'COMMITTEE', 'EDITION', 'FLEET', 'TEAM', 'YEARGROUP');

-- CreateEnum
CREATE TYPE "MemberType" AS ENUM ('COACH', 'ERELID', 'LID', 'NUL', 'RINGVAART', 'VERDIENSTE');

-- CreateEnum
CREATE TYPE "Permission" AS ENUM ('ADMIN', 'MANAGE_GROUPS', 'MANAGE_PERMISSIONS', 'MANAGE_MATERIALS');

-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "StudyLevel" AS ENUM ('ASSOCIATE_DEGREE', 'BACHELOR_OF_SCIENCE', 'MASTER_OF_SCIENCE', 'BACHELOR_OF_ARTS', 'MASTER_OF_ARTS', 'BACHELOR_OF_LAWS', 'MASTER_OF_LAWS', 'DOCTORATE');

-- CreateTable
CREATE TABLE "contacts" (
    "id" UUID NOT NULL,
    "value" VARCHAR(120) NOT NULL,
    "type" "ContactType" NOT NULL,
    "memberId" UUID,
    "groupId" UUID,

    CONSTRAINT "contacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "groups" (
    "id" UUID NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" VARCHAR(120) NOT NULL DEFAULT '',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "startDate" DATE NOT NULL DEFAULT CURRENT_DATE,
    "lastActive" DATE NOT NULL DEFAULT CURRENT_DATE,
    "permissions" "Permission"[],
    "parentId" UUID NOT NULL,

    CONSTRAINT "groups_pkey" PRIMARY KEY ("id"),
    CHECK ( "lastActive" >= "startDate" )
);

-- CreateTable
CREATE TABLE "memberships" (
    "id" UUID NOT NULL,
    "function" VARCHAR(50) NOT NULL DEFAULT '',
    "startDate" DATE NOT NULL DEFAULT CURRENT_DATE,
    "stopDate" DATE,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "memberId" UUID,
    "groupId" UUID NOT NULL,

    CONSTRAINT "memberships_pkey" PRIMARY KEY ("id"),
    CHECK ( "stopDate" >= "startDate" )
);

-- CreateTable
CREATE TABLE "members" (
    "id" UUID NOT NULL,
    "title" VARCHAR(10) NOT NULL DEFAULT '',
    "initials" VARCHAR(10) NOT NULL,
    "firstName" VARCHAR(40) NOT NULL,
    "insertion" VARCHAR(10) NOT NULL DEFAULT '',
    "lastName" VARCHAR(40) NOT NULL,
    "address" VARCHAR(40) NOT NULL,
    "number" VARCHAR(40) NOT NULL,
    "city" VARCHAR(40) NOT NULL,
    "zipcode" VARCHAR(20) NOT NULL,
    "country" VARCHAR(40) NOT NULL,
    "birthday" DATE NOT NULL,
    "gender" "Sex" NOT NULL,
    "permissions" "Permission"[],

    CONSTRAINT "members_pkey" PRIMARY KEY ("id"),
    CHECK ( "birthday" <= CURRENT_DATE )
);

-- CreateTable
CREATE TABLE "member_studies" (
    "id" UUID NOT NULL,
    "studyNumber" VARCHAR(40) NOT NULL DEFAULT '',
    "startDate" DATE NOT NULL,
    "stopDate" DATE,
    "memberId" UUID NOT NULL,
    "studyId" UUID NOT NULL,

    CONSTRAINT "member_studies_pkey" PRIMARY KEY ("id"),
    CHECK ( "stopDate" >= "startDate" )
);

-- CreateTable
CREATE TABLE "studies" (
    "id" UUID NOT NULL,
    "name" VARCHAR(40) NOT NULL,
    "level" "StudyLevel" NOT NULL,
    "institution" VARCHAR(40) NOT NULL,

    CONSTRAINT "studies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_group_visibility" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_group_invisibility" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_group_visibility_AB_unique" ON "_group_visibility"("A", "B");

-- CreateIndex
CREATE INDEX "_group_visibility_B_index" ON "_group_visibility"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_group_invisibility_AB_unique" ON "_group_invisibility"("A", "B");

-- CreateIndex
CREATE INDEX "_group_invisibility_B_index" ON "_group_invisibility"("B");

-- AddForeignKey
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "members"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "groups" ADD CONSTRAINT "groups_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "memberships" ADD CONSTRAINT "memberships_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "members"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "memberships" ADD CONSTRAINT "memberships_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "member_studies" ADD CONSTRAINT "member_studies_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "members"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "member_studies" ADD CONSTRAINT "member_studies_studyId_fkey" FOREIGN KEY ("studyId") REFERENCES "studies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_group_visibility" ADD CONSTRAINT "_group_visibility_A_fkey" FOREIGN KEY ("A") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_group_visibility" ADD CONSTRAINT "_group_visibility_B_fkey" FOREIGN KEY ("B") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_group_invisibility" ADD CONSTRAINT "_group_invisibility_A_fkey" FOREIGN KEY ("A") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_group_invisibility" ADD CONSTRAINT "_group_invisibility_B_fkey" FOREIGN KEY ("B") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;
