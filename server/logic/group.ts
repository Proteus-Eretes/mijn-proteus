import { apiError, ErrorCode } from "~/utils/error";
import { GroupCreate, GroupUpdate } from "~/server/validation";
import { prisma } from "~/server/prisma";

/**
 * Add new group to the database.
 * @param data The data of the new group.
 * @returns The created group.
 */
export const create = async (group: GroupCreate) => {
  if (group.parentId && !(await get(group.parentId))) {
    throw apiError(ErrorCode.NotFound, "The parent group was not found!");
  }

  return await prisma.group.create({
    data: group,
  });
};

/**
 * Update group in the database.
 * @param id The id of the group to be updated.
 * @param data The data of the group to be updated.
 * @returns The updated group.
 */
export const update = async (id: string, group: GroupUpdate) => {
  return await prisma.group.update({
    where: { id },
    data: group,
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
 * Delete group from the database.
 * @param id The id of the group
 * @returns The deleted group.
 */
export const remove = async (id: string) => {
  return await prisma.group.delete({ where: { id } });
};
