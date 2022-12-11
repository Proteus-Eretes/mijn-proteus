import { apiError, ErrorCode } from "~/utils/error";
import { prisma } from "~/server/prisma";

import { MembershipCreate, MembershipUpdate } from "../validation";

import { group, member } from ".";

/**
 * Add new membership to the database.
 * @param membership The membership to create.
 * @returns The created membership.
 */
export const create = async (membership: MembershipCreate) => {
  if (membership.memberId && !(await member.get(membership.memberId))) {
    throw apiError(ErrorCode.NotFound, "Member not found!");
  }

  if (membership.groupId && !(await group.get(membership.groupId))) {
    throw apiError(ErrorCode.NotFound, "Group not found!");
  }

  return await prisma.membership.create({
    data: membership,
  });
};

/**
 * Update membership in the database.
 * @param id The id of the membership to be updated.
 * @param membership Partial map of the fields to be updated.
 * @returns The updated membership.
 */
export const update = async (id: string, membership: MembershipUpdate) => {
  return await prisma.membership.update({
    where: { id },
    data: membership,
  });
};

/**
 * Get a membership from the database.
 * @param id The id of the membership.
 * @returns The requested membership if found, otherwise null.
 */
export const get = async (id: string) => {
  return await prisma.membership.findUnique({ where: { id } });
};

/**
 * Delete membership from the database.
 * @param id The id of the membership.
 * @returns The deleted membership.
 */
export const remove = async (id: string) => {
  return await prisma.membership.delete({ where: { id } });
};
