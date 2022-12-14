import { prisma } from "../..";

export const member = [
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
];
