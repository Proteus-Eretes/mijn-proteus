import { authentik, member } from "~/server/logic";

/**
 * Sync a member to Authentik.
 * @param id The ID of the member to sync.
 */
export const syncMember = async (id: string) => {
  if (await member.exists(id)) {
    // The member does no longer exist in the database, so remove it from Authentik too.
    await authentik.user.remove(id);
  }

  const akuser = await authentik.user.findByProteusId(id);
  if (akuser) {
    // The member is also found in Authentik, so we will update the user.
    await authentik.user.update(akuser.pk, id);
  } else {
    // The member was not found in Authentik, so creating a new user.
    await authentik.user.create(id);
  }
};

/**
 * Reset authentik, mostly used for development.
 * This removes all users with a Proteus ID.
 */
export const reset = async () => {
  // Remove users.
  while (true) {
    const users = await authentik.user.getList();

    if (users?.length === 0) {
      break;
    }

    await Promise.all(users.map((u) => authentik.user.removeAk(u.pk)));
  }
};
