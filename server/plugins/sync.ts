import { runSync } from "~/server/sync";

/**
 * Run a sync every ten seconds.
 */
export default defineNitroPlugin(async () => {
  await runSync();

  setInterval(() => runSync(), 10 * 1000);
});
