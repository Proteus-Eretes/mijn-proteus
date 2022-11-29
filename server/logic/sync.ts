import { Sync } from "@prisma/client";

import { prisma } from "../prisma/client";

/**
 * Get a single task, updating it's next attempt.
 * @returns a sync task if it exists, null otherwise.
 */
export const get = async () => {
  const task = await prisma.sync.findFirst({
    where: {
      OR: [{ nextAttempt: { lte: new Date() } }, { nextAttempt: null }],
    },
    orderBy: {
      nextAttempt: "asc",
    },
  });

  if (!task) {
    return null;
  }

  // Now + 1 minute.
  const next = new Date(Date.now() + 60 * 1000);

  return await prisma.sync.update({
    where: {
      id_type: {
        id: task.id,
        type: task.type,
      },
    },
    data: {
      nextAttempt: next,
    },
  });
};

/**
 * Remove a task.
 * @param task The task to remove.
 * @returns the deleted task.
 */
export const remove = async (task: Sync) => {
  return await prisma.sync.delete({
    where: {
      id_type: {
        id: task.id,
        type: task.type,
      },
    },
  });
};
