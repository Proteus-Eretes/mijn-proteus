import { reset, runSync } from "~/server/sync";
import { isApiError } from "~/utils/error";
import { member } from "~/server/logic";
import { seed } from "~/server/prisma";

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

    if (isApiError(e)) {
      console.error(`[${e.code}] ${e.context}`);
    } else {
      console.error(e);
    }
  }
});
