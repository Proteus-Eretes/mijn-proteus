import { prisma } from "../prisma/client";
import { apiError } from "../utils";
import { ErrorCode } from "../error";
import { member, group } from "../logic";

/**
 * Add new membership to the database.
 * @param data The data of the membership.
 * @returns The created membership.
 */
export const create = async (data: {
  function?: string;
  startDate?: Date;
  stopDate?: Date;
  isAdmin?: boolean;
  memberId: string;
  groupId: string;
}) => {
  if (data.memberId && !(await member.get(data.memberId))) {
    throw apiError(ErrorCode.NotFound, "Member not found!");
  }
  if (data.groupId && !(await group.get(data.groupId))) {
    throw apiError(ErrorCode.NotFound, "Group not found!");
  }

  return await prisma.membership.create({
    data,
  });
};

/**
 * Update membership in the database.
 * @param id The id of the membership to be updated.
 * @param data The updated data of the membership.
 * @returns The updated membership.
 */
export const update = async (
  id: string,
  data: {
    function?: string;
    startDate?: Date;
    stopDate?: Date;
    isAdmin?: boolean;
  },
) => {
  return await prisma.membership.update({
    where: { id },
    data,
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
