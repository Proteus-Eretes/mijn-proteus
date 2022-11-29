import { Member } from "@prisma/client";

/**
 * Sync a member to Authentik.
 * @param member The member to sync.
 */
export const syncMember = (member: Member | null) => {
  console.log(`Syncing member ${member?.id} with Authentik.`);
};
