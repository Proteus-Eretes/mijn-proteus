import { runSync } from "../sync";

/**
 * Run a sync ten seconds.
 */
export default defineNitroPlugin(async () => {
  await runSync();

  setInterval(() => runSync(), 10 * 1000);
});
