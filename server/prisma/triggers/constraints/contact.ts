import { prisma } from "../..";

export const contact = () => [
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
];
