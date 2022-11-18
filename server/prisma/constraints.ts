import { prisma } from "./client";

/**
 * This file adds database constrainst which are not natively supported by Prisma.
 * Think of making sure multiple boat reservations don't overlap and that there is enough credit for a transaction.
 * These constraints should not be relied upon, and validation should be done on route level.
 *
 * This script is ran every time when the server starts, so it should be idempotent.
 */
export const addConstraints = async () => {
  return await prisma.$transaction([
    // --- Functions
    // Define some helper functions used with constraints
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

    // --- Contact
    // Ensures that a contact has either a group or a member associated.
    prisma.$executeRawUnsafe(
      `ALTER TABLE "Contact" DROP CONSTRAINT IF EXISTS contact_exclusive_connection`,
    ),
    prisma.$executeRawUnsafe(
      `ALTER TABLE "Contact" ADD CONSTRAINT contact_exclusive_connection CHECK (("memberId" IS NULL ) != ("groupId" IS NULL))`,
    ),

    // --- Group
    // Start date is before end date, if the end date exists.
    prisma.$executeRawUnsafe(
      `ALTER TABLE "Group" DROP CONSTRAINT IF EXISTS group_start_before_end`,
    ),
    prisma.$executeRawUnsafe(
      `ALTER TABLE "Group" ADD CONSTRAINT group_start_before_end CHECK ("startDate" < "stopDate" OR "stopDate" IS NULL)`,
    ),

    // --- MemberStudy
    // Start date is before end date, if the end date exists.
    prisma.$executeRawUnsafe(
      `ALTER TABLE "MemberStudy" DROP CONSTRAINT IF EXISTS memberstudy_start_before_end`,
    ),
    prisma.$executeRawUnsafe(
      `ALTER TABLE "MemberStudy" ADD CONSTRAINT memberstudy_start_before_end CHECK ("startDate" < "stopDate" OR "stopDate" IS NULL)`,
    ),

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
