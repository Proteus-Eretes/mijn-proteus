import { reset, runSync } from "~/server/sync";
import { seed } from "~/server/prisma/seed";
import { member } from "~/server/logic";

/**
 * Seed the database automatically when no members are detected.
 * This is only done when the runtime config flag is set.
 */
export default defineNitroPlugin(async () => {
  const config = useRuntimeConfig();

  if (!config.seed) {
    return;
  }

  if ((await member.count()) > 0) {
    return;
  }

  try {
    await reset();
    await seed();
    await runSync();
  } catch (e) {
    console.error("Failed to seed the database!");
    console.error(e);
  }
});
