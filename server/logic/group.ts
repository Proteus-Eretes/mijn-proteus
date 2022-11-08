import { Group, GroupType } from "@prisma/client";

import { prisma } from "../prisma/client";

/**
 * Add new group to the database.
 * @param data The data of the new group.
 * @returns The created group.
 */
export const create = async (data: {
  name: string;
  description: string;
  isActive: boolean;
  startDate: Date;
  lastActive: Date;
  type: GroupType;
  parentId?: string;
}): Promise<Group> => {
  return await prisma.group.create({ data });
};

/**
 * Update group in the database.
 * @param id The id of the group to be updated
 * @param data The data for the new material.
 * @returns The updated group.
 */
export const update = async (
  id: string,
  data: {
    name: string;
    description: string;
    isActive: boolean;
    startDate: Date;
    lastActive: Date;
    type: GroupType;
    parentId?: string;
  },
): Promise<Group> => {
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
export const get = async (id: string): Promise<Group | null> => {
  return await prisma.group.findUnique({ where: { id } });
};

/**
 * Delete group from the database.
 * @returns The deleted group.
 */
export const remove = async (id: string): Promise<Group> => {
  return await prisma.group.delete({ where: { id } });
};

/**
 * Get all groups.
 * @returns A list of all groups.
 */
export const getAll = async (): Promise<Group[]> => {
  return await prisma.group.findMany();
};

/**
 * Get all subgroups of group.
 * @returns A list of all groups.
 */
export const getAllOf = async (id: string): Promise<Group[] | null> => {
  return await prisma.group.findUnique({ where: { id } }).children();
};
