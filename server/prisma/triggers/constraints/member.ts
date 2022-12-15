import { prisma } from "../..";

export const member = () => [
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
];
