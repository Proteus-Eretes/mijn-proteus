import { authentikFetch } from "./";

import { ErrorCode } from "~/server/error";
import { apiError } from "~/server/utils";
import { member } from "~/server/logic";

const PATH = "users/proteus";
const PAGE_SIZE = 100;

/**
 * Get a list of users, per 100 users.
 * @param page the page of users to get.
 * @returns a list of Authentik users.
 */
export const getList = async (page = 1): Promise<AkUser[]> => {
  const p = encodeURIComponent(PATH);
  const res = await authentikFetch(
    `/core/users/?path=${p}&page=${page}&page_size=${PAGE_SIZE}`,
  );

  if (!res.ok) {
    throw apiError(
      ErrorCode.InternalError,
      "Failed to get a list of users from Authentik.",
    );
  }

  const body = await res.json();
  return body?.results;
};

/**
 * Find an authentik user based on it's Proteus ID.
 * @param id The proteus ID to look for.
 * @returns The authentik user if it exists, otherwise null.
 */
export const findByProteusId = async (id: string): Promise<AkUser | null> => {
  const p = encodeURIComponent(PATH);
  const attributes = JSON.stringify({
    proteusId: id,
  });
  const res = await authentikFetch(
    `/core/users/?path=${p}&attributes=${encodeURIComponent(attributes)}`,
  );

  if (!res.ok) {
    throw apiError(
      ErrorCode.InternalError,
      "Failed to send a request to Authentik.",
    );
  }

  const body = await res.json();
  return body?.results?.[0];
};

/**
 * Upsert the user, meaning it will create it if it doesn't exist.
 * The existence check is based on the Proteus ID, not an Authentik identifier.
 * @param proteusId the id of the member to upsert.
 */
export const upsert = async (proteusId: string) => {
  const akuser = await findByProteusId(proteusId);

  if (akuser) {
    return await update(akuser.pk, proteusId);
  } else {
    return await create(proteusId);
  }
};

/**
 * Create an Authentik user from a member.
 * Calling this twice with the same proteus ID WILL create two different accounts!
 * @param proteusId the ID of the member to create.
 */
export const create = async (proteusId: string): Promise<AkUser> => {
  const res = await authentikFetch("/core/users/", {
    method: "post",
    body: JSON.stringify(await buildUserBody(proteusId)),
  });

  if (!res.ok) {
    throw apiError(
      ErrorCode.InternalError,
      `Failed to create the Authentik user (${res.statusText}).`,
    );
  }

  return await res.json();
};

/**
 * Update a member with authentik.
 * @param pk The Authentik ID of the user to update.
 * @param proteusId The Proteus ID of the member to sync with.
 * @returns the updated user.
 */
export const update = async (
  pk: number,
  proteusId: string,
): Promise<AkUser> => {
  const res = await authentikFetch(`/core/users/${pk}`, {
    method: "put",
    body: JSON.stringify(await buildUserBody(proteusId)),
  });

  if (!res.ok) {
    throw apiError(
      ErrorCode.InternalError,
      `Failed to update the Authentik user (${res.statusText}).`,
    );
  }

  return await res.json();
};

/**
 * Remove a user from authentik.
 * @param proteusId The Proteus ID of the member.
 */
export const remove = async (proteusId: string) => {
  const akuser = await findByProteusId(proteusId);

  if (!akuser) {
    // The user is already deleted, counting this as a win.
    return;
  }

  return await removeAk(akuser.pk);
};

/**
 * Remove a user from authentik.
 * @param pk The Authentik ID of the user.
 */
export const removeAk = async (pk: number) => {
  const res = await authentikFetch(`/core/users/${pk}/`, {
    method: "delete",
  });

  if (!res.ok) {
    throw apiError(
      ErrorCode.InternalError,
      `Failed to delete the authentik user (${res.statusText}).`,
    );
  }
};

/**
 * Build the body to submit to endpoints requiring you to specify the user body.
 * This is used when creating or updating a user.
 * @param proteusId The ID of the proteus member to build the body for.
 * @returns The request body.
 */
const buildUserBody = async (proteusId: string) => {
  const mem = await member.get(proteusId);

  if (!mem) {
    throw apiError(ErrorCode.NotFound, "The member was not found.");
  }

  let insertion = " ";
  if (mem.insertion !== "") {
    insertion = ` ${mem.insertion} `;
  }

  const name = `${mem.firstName}${insertion}${mem.lastName}`;
  const email = mem.contacts.find((c) => c.type === "EMAIL")?.value;

  if (!email) {
    throw apiError(
      ErrorCode.InternalError,
      "The user does not have a email associated!",
    );
  }

  return {
    username: email,
    email,
    name,
    is_active: true,
    groups: [],
    path: PATH,
    attributes: {
      proteusId: mem.id,
      lastSync: new Date(),
    },
  };
};

/**
 * Authentik user representatation.
 */
interface AkUser {
  pk: number;
  username: string;
  name: string;
  is_active?: boolean;
  last_login?: Date;
  is_superuser: boolean;
  groups: string[];
  email?: string;
  avatar: string;
  uid: string;
  path?: string;
  attributes?: { [key: string]: string };
}
