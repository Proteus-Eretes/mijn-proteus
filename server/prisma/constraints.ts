import { prisma } from "./";

/**
 * This file adds database constrainst which are not natively supported by Prisma.
 * Think of making sure multiple boat reservations don't overlap and that there is enough credit for a transaction.
 * These constraints should not be relied upon, and validation should be done on route level.
 *
 * This script is ran every time when the server starts, so it should be idempotent.
 */
export const addConstraints = async () => {
  return await prisma.$transaction([
    // --- Extensions
    // Are needed by some constraints.
    prisma.$executeRawUnsafe(`CREATE EXTENSION IF NOT EXISTS btree_gist`),

    // --- Functions
    // Define some helper functions used with constraints
    prisma.$executeRawUnsafe(`
      CREATE OR REPLACE FUNCTION validate_group_members(type uuid) RETURNS boolean AS $valid$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM "Group" where type = "parentId") THEN
          RETURN TRUE;
        END IF;

        IF NOT EXISTS (SELECT 1 FROM "Membership" where type = "groupId") THEN
          RETURN TRUE;
        END IF;

        RAISE EXCEPTION 'Groups cannot have subgroups AND members associated.';
      END;
      $valid$ LANGUAGE plpgsql;
    `),
    prisma.$executeRawUnsafe(`
      CREATE OR REPLACE FUNCTION validate_material_type(type uuid) RETURNS boolean AS $valid$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM "MaterialType" where type = "parentId") THEN
          RETURN TRUE;
        END IF;

        IF NOT EXISTS (SELECT 1 FROM "Material" where type = "typeId") THEN
          RETURN TRUE;
        END IF;

        RAISE EXCEPTION 'Material type cannot have children AND materials associated.';
      END;
      $valid$ LANGUAGE plpgsql;
    `),
    prisma.$executeRawUnsafe(`
      CREATE OR REPLACE FUNCTION validate_member_contacts(member uuid) RETURNS boolean AS $valid$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM "Member" where member = "id") THEN
          -- The user no longer exists, so we don't care if the user no longer has contacts.
          RETURN true;
        END IF;

        IF NOT EXISTS (SELECT 1 FROM "Contact" where member = "memberId" AND "type" = 'EMAIL') THEN
          RAISE EXCEPTION 'A member needs at least an email address.';
        END IF;

        IF NOT EXISTS (SELECT 1 FROM "Contact" where member = "memberId" AND "type" = 'PHONE') THEN
          RAISE EXCEPTION 'A member needs at least a phone number.';
        END IF;

        RETURN true;
      END;
      $valid$ LANGUAGE plpgsql;
    `),

    // --- Sync
    // Insert a sync job when a user is changed.
    prisma.$executeRawUnsafe(`DROP TRIGGER IF EXISTS sync_member on "Member"`),
    prisma.$executeRawUnsafe(`
      CREATE OR REPLACE FUNCTION sync_member() RETURNS trigger AS $$
      BEGIN
        IF OLD IS NOT NULL THEN
          INSERT INTO "Sync" (id, type) VALUES (OLD."id", 'MEMBER') ON CONFLICT DO NOTHING;
        END IF;

        IF NEW IS NOT NULL THEN
          INSERT INTO "Sync" (id, type) VALUES (NEW."id", 'MEMBER') ON CONFLICT DO NOTHING;
        END IF;

        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `),
    prisma.$executeRawUnsafe(`
      CREATE CONSTRAINT TRIGGER sync_member
      AFTER INSERT OR UPDATE OR DELETE
      ON "Member"
      INITIALLY DEFERRED
      FOR EACH ROW
      EXECUTE FUNCTION sync_member()
    `),

    // --- Contact
    // Ensures that a contact has either a group or a member associated.
    prisma.$executeRawUnsafe(
      `ALTER TABLE "Contact" DROP CONSTRAINT IF EXISTS contact_exclusive_connection`,
    ),
    prisma.$executeRawUnsafe(
      `ALTER TABLE "Contact" ADD CONSTRAINT contact_exclusive_connection CHECK (("memberId" IS NULL ) != ("groupId" IS NULL))`,
    ),

    // A member should at least have an email and phone number associated.
    prisma.$executeRawUnsafe(
      `DROP TRIGGER IF EXISTS contact_memberemail on "Contact"`,
    ),
    prisma.$executeRawUnsafe(`
      CREATE OR REPLACE FUNCTION contact_memberemail() RETURNS trigger AS $contact$
      BEGIN
        IF OLD."memberId" IS NOT NULL THEN
          PERFORM validate_member_contacts(OLD."memberId");
        END IF;

        IF NEW."memberId" IS NOT NULL THEN
          PERFORM validate_member_contacts(NEW."memberId");
        END IF;

        RETURN NEW;
      END;
      $contact$ LANGUAGE plpgsql;
    `),
    prisma.$executeRawUnsafe(`
      CREATE CONSTRAINT TRIGGER contact_memberemail
      AFTER INSERT OR UPDATE OR DELETE
      ON "Contact"
      INITIALLY DEFERRED
      FOR EACH ROW
      EXECUTE FUNCTION contact_memberemail()
    `),

    // --- Group
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

    // --- MemberStudy
    // Start date is before end date, if the end date exists.
    prisma.$executeRawUnsafe(
      `ALTER TABLE "MemberStudy" DROP CONSTRAINT IF EXISTS memberstudy_start_before_end`,
    ),
    prisma.$executeRawUnsafe(
      `ALTER TABLE "MemberStudy" ADD CONSTRAINT memberstudy_start_before_end CHECK ("startDate" < "stopDate" OR "stopDate" IS NULL)`,
    ),

    // --- Membership
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

    // --- Member
    // A member should at least have an email and phone number associated.
    prisma.$executeRawUnsafe(
      `DROP TRIGGER IF EXISTS member_emailcontact on "Member"`,
    ),
    prisma.$executeRawUnsafe(`
      CREATE OR REPLACE FUNCTION member_emailcontact() RETURNS trigger AS $member$
      BEGIN
        PERFORM validate_member_contacts(NEW."id");
        RETURN NEW;
      END;
      $member$ LANGUAGE plpgsql;
    `),
    prisma.$executeRawUnsafe(`
      CREATE CONSTRAINT TRIGGER member_emailcontact
      AFTER INSERT OR UPDATE OF "id"
      ON "Member"
      INITIALLY DEFERRED
      FOR EACH ROW
      EXECUTE FUNCTION member_emailcontact()
    `),

    // --- MaterialType
    // Make sure that materials are only added to leaf types.
    // This uses the same check as on material, but needs to be added separately to check on both table updates.
    prisma.$executeRawUnsafe(
      `DROP TRIGGER IF EXISTS materialtype_instance_leaf on "MaterialType"`,
    ),
    prisma.$executeRawUnsafe(`
      CREATE OR REPLACE FUNCTION materialtype_instance_validate() RETURNS trigger AS $material_type$
      BEGIN
        PERFORM validate_material_type(NEW."id");

        IF NEW."parentId" IS NOT NULL THEN
          PERFORM validate_material_type(NEW."parentId");
        END IF;

        RETURN NEW;
      END;
      $material_type$ LANGUAGE plpgsql;
    `),
    prisma.$executeRawUnsafe(`
      CREATE CONSTRAINT TRIGGER materialtype_instance_leaf
      AFTER INSERT OR UPDATE OF "id", "parentId"
      ON "MaterialType"
      INITIALLY DEFERRED
      FOR EACH ROW
      EXECUTE FUNCTION materialtype_instance_validate()
    `),

    // Material types cannot have a circulair reference (material types should be a tree).
    prisma.$executeRawUnsafe(
      `DROP TRIGGER IF EXISTS materialtype_tree on "MaterialType"`,
    ),
    prisma.$executeRawUnsafe(`
      CREATE OR REPLACE FUNCTION validate_materialtype_tree(curr uuid, target uuid) RETURNS boolean AS $valid$
      DECLARE
        parent uuid;
      BEGIN
        IF curr = target THEN
          RAISE EXCEPTION 'Material types are required to be a tree.';
        END IF;

        SELECT "parentId" INTO parent FROM "MaterialType" WHERE "id" = curr;

        IF parent IS NULL THEN
          RETURN TRUE;
        END IF;

        RETURN validate_materialtype_tree(parent, target);
      END;
      $valid$ LANGUAGE plpgsql;
    `),
    prisma.$executeRawUnsafe(`
      CREATE OR REPLACE FUNCTION materialtype_tree() RETURNS trigger AS $materialtype$
      BEGIN
        PERFORM validate_materialtype_tree(NEW."parentId", NEW."id");

        RETURN NEW;
      END;
      $materialtype$ LANGUAGE plpgsql;
    `),
    prisma.$executeRawUnsafe(`
      CREATE CONSTRAINT TRIGGER materialtype_tree
      AFTER INSERT OR UPDATE OF "id", "parentId"
      ON "MaterialType"
      INITIALLY DEFERRED
      FOR EACH ROW
      EXECUTE FUNCTION materialtype_tree()
    `),

    // --- Material
    // Make sure that materials are only added to leaf types.
    // This uses the same check as on material type, but needs to be added separately to check on both table updates.
    prisma.$executeRawUnsafe(
      `DROP TRIGGER IF EXISTS material_instance_leaf on "Material"`,
    ),
    prisma.$executeRawUnsafe(`
      CREATE OR REPLACE FUNCTION material_instance_validate() RETURNS trigger AS $material$
      BEGIN
        PERFORM validate_material_type(NEW."typeId");
        RETURN NEW;
      END;
      $material$ LANGUAGE plpgsql;
    `),
    prisma.$executeRawUnsafe(`
      CREATE CONSTRAINT TRIGGER material_instance_leaf
      AFTER INSERT OR UPDATE OF "typeId"
      ON "Material"
      INITIALLY DEFERRED
      FOR EACH ROW
      EXECUTE FUNCTION material_instance_validate()
    `),
  ]);
};
