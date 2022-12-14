import { prisma } from "../../..";

import { materialType } from "./type";

export const material = [
  ...materialType,

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
];
