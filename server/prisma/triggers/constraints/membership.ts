import { prisma } from "../..";

export const membership = [
  // Start date is before end date, if the end date exists.
  prisma.$executeRawUnsafe(
    `ALTER TABLE "Membership" DROP CONSTRAINT IF EXISTS membership_start_before_end`,
  ),
  prisma.$executeRawUnsafe(
    `ALTER TABLE "Membership" ADD CONSTRAINT membership_start_before_end CHECK ("startDate" < "stopDate" OR "stopDate" IS NULL)`,
  ),

  // Makes sure that a group doesn't both have subgroups and users.
  prisma.$executeRawUnsafe(
    `DROP TRIGGER IF EXISTS membership_subgroupusers on "Membership"`,
  ),
  prisma.$executeRawUnsafe(`
    CREATE OR REPLACE FUNCTION membership_subgroupusers_validate() RETURNS trigger AS $membership$
    BEGIN
      PERFORM validate_group_members(NEW."groupId");
      RETURN NEW;
    END;
    $membership$ LANGUAGE plpgsql;
  `),
  prisma.$executeRawUnsafe(`
    CREATE CONSTRAINT TRIGGER membership_subgroupusers
    AFTER INSERT OR UPDATE OF "groupId"
    ON "Membership"
    INITIALLY DEFERRED
    FOR EACH ROW
    EXECUTE FUNCTION membership_subgroupusers_validate()
  `),

  // Requires multiple memberships of members in a group to not overlap.
  prisma.$executeRawUnsafe(
    `ALTER TABLE "Membership" DROP CONSTRAINT IF EXISTS membership_overlap`,
  ),
  prisma.$executeRawUnsafe(
    `ALTER TABLE "Membership" ADD CONSTRAINT membership_overlap EXCLUDE USING gist (
      "memberId" WITH =,
      "groupId" WITH =,
      daterange("startDate", COALESCE("stopDate", 'infinity'::date)) WITH &&
    ) WHERE (
      "memberId" IS NOT NULL
    )`,
  ),
];
