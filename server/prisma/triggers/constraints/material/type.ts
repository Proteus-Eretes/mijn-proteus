import { prisma } from "../../..";

export const materialType = [
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
];
