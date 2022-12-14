import { prisma } from "../..";

export const group = () => [
  // Start date is before end date, if the end date exists.
  prisma.$executeRawUnsafe(
    `ALTER TABLE "Group" DROP CONSTRAINT IF EXISTS group_start_before_end`,
  ),
  prisma.$executeRawUnsafe(
    `ALTER TABLE "Group" ADD CONSTRAINT group_start_before_end CHECK ("startDate" < "stopDate" OR "stopDate" IS NULL)`,
  ),

  // Makes sure that a group doesn't both have subgroups and users.
  prisma.$executeRawUnsafe(
    `DROP TRIGGER IF EXISTS group_subgroupusers on "Group"`,
  ),
  prisma.$executeRawUnsafe(`
    CREATE OR REPLACE FUNCTION group_subgroupusers_validate() RETURNS trigger AS $group$
    BEGIN
      PERFORM validate_group_members(NEW."id");

      IF NEW."parentId" IS NOT NULL THEN
        PERFORM validate_group_members(NEW."parentId");
      END IF;

      RETURN NEW;
    END;
    $group$ LANGUAGE plpgsql;
  `),
  prisma.$executeRawUnsafe(`
    CREATE CONSTRAINT TRIGGER group_subgroupusers
    AFTER INSERT OR UPDATE OF "id", "parentId"
    ON "Group"
    INITIALLY DEFERRED
    FOR EACH ROW
    EXECUTE FUNCTION group_subgroupusers_validate()
  `),

  // Groups cannot have a circulair reference (groups should be a tree).
  prisma.$executeRawUnsafe(`DROP TRIGGER IF EXISTS group_tree on "Group"`),
  prisma.$executeRawUnsafe(`
    CREATE OR REPLACE FUNCTION validate_group_tree(curr uuid, target uuid) RETURNS boolean AS $valid$
    DECLARE
      parent uuid;
    BEGIN
      IF curr = target THEN
        RAISE EXCEPTION 'Groups are required to be a tree.';
      END IF;

      SELECT "parentId" INTO parent FROM "Group" WHERE "id" = curr;

      IF parent IS NULL THEN
        RETURN TRUE;
      END IF;

      RETURN validate_group_tree(parent, target);
    END;
    $valid$ LANGUAGE plpgsql;
  `),
  prisma.$executeRawUnsafe(`
    CREATE OR REPLACE FUNCTION group_tree() RETURNS trigger AS $group$
    BEGIN
      PERFORM validate_group_tree(NEW."parentId", NEW."id");

      RETURN NEW;
    END;
    $group$ LANGUAGE plpgsql;
  `),
  prisma.$executeRawUnsafe(`
    CREATE CONSTRAINT TRIGGER group_tree
    AFTER INSERT OR UPDATE OF "id", "parentId"
    ON "Group"
    INITIALLY DEFERRED
    FOR EACH ROW
    EXECUTE FUNCTION group_tree()
  `),
];
