import { prisma } from "../..";

export const memberStudy = [
  // Start date is before end date, if the end date exists.
  prisma.$executeRawUnsafe(
    `ALTER TABLE "MemberStudy" DROP CONSTRAINT IF EXISTS memberstudy_start_before_end`,
  ),
  prisma.$executeRawUnsafe(
    `ALTER TABLE "MemberStudy" ADD CONSTRAINT memberstudy_start_before_end CHECK ("startDate" < "stopDate" OR "stopDate" IS NULL)`,
  ),
];
