import { member, sync } from "../logic";

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
 * Sync a member with external systems.
 * @param id the ID of the memer to sync.
 */
const syncMember = async (id: string) => {
  const target = await member.get(id);

  await authentik.syncMember(target);
};
