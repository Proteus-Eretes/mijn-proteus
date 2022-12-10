import { prisma } from "../prisma/client";
import { apiError } from "../utils";
import { ErrorCode } from "../error";

/**
 * Add new group to the database.
 * @param data The data of the new group.
 * @returns The created group.
 */
export const create = async (data: {
  name: string;
  description: string;
  startDate?: string;
  stopDate?: string;
  parentId?: string;
}) => {
  if (data.parentId) {
    const parent = await get(data.parentId);

    if (!parent) {
      throw apiError(ErrorCode.NotFound, "The parent group was not found!");
    }
  }

  return await prisma.group.create({
    data,
  });
};

/**
 * Update group in the database.
 * @param id The id of the group to be updated.
 * @param data The data of the group to be updated.
 * @returns The updated group.
 */
export const update = async (
  id: string,
  data: {
    name?: string;
    description?: string;
    startDate?: string;
    stopDate?: string;
    allowMembers?: boolean;
    allowSubgroups?: boolean;
  },
) => {
  return await prisma.group.update({
    where: { id },
    data,
  });
};

/**
 * Get a group from the database.
 * @param id The id of the group
 * @returns The requested group if found, otherwise null.
 */
export const get = async (id: string) => {
  return await prisma.group.findUnique({
    where: { id },
    include: {
      contacts: true,
    },
  });
};

/**
 * Get all groups from the database.
 * @returns The requested group if found, otherwise null.
 */
export const getAll = async () => {
  return await prisma.group.findMany({
    include: {
      contacts: true,
    },
  });
};

/**
 * Delete group from the database.
 * @param id The id of the group
 * @returns The deleted group.
 */
export const remove = async (id: string) => {
  return await prisma.group.delete({ where: { id } });
};
