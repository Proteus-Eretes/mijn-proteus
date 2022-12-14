import { prisma } from "..";

export const functions = [
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
];
