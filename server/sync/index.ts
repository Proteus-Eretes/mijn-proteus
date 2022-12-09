import { sync } from "~/server/logic";

import * as authentik from "./authentik";

/**
 * Run a sync of all pending tasks.
 * @returns a count of successful tasks.
 */
export const runSync = async () => {
  let synced = 0;

  while (true) {
    const task = await sync.get();

    if (!task) {
      break;
    }

    switch (task.type) {
      case "MEMBER":
        await syncMember(task.id);
        break;
    }

    await sync.remove(task);
    synced++;
  }

  return synced;
};

/**
 * Reset all synced services to a (mostly) clean state.
 * This mostly makes all services workable after a full database reset.
 */
export const reset = async () => {
  return await authentik.reset();
};

/**
 * Sync a member with external systems.
 * @param id the ID of the memer to sync.
 */
const syncMember = async (id: string) => {
  await authentik.syncMember(id);
};
