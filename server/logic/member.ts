import { MemberCreate, MemberUpdate } from "~/server/validation";
import { prisma } from "~/server/prisma";

/**
 * Add new member to the database.
 * @param member The new member to create.
 * @returns The created member.
 */
export const create = async (member: MemberCreate) => {
  return await prisma.member.create({
    data: { ...member, contacts: { create: member.contacts } },
  });
};

/**
 * Update member in the database.
 * @param id The id of the member to be updated.
 * @param member The updated data of the member.
 * @returns The updated member.
 */
export const update = async (id: string, member: MemberUpdate) => {
  return await prisma.member.update({
    where: { id },
    data: member,
  });
};

/**
 * Get a member from the database.
 * @param id The id of the member.
 * @returns The requested member if found, otherwise null.
 */
export const get = async (id: string) => {
  return await prisma.member.findUnique({
    where: { id },
    include: {
      contacts: true,
      studies: true,
      memberships: true,
    },
  });
};

/**
 * Get all members from the database.
 * @returns The requested member if found, otherwise null.
 */
export const getAll = async () => {
  return await prisma.member.findMany({
    include: {
      contacts: true,
      studies: true,
      memberships: true,
    },
  });
};

/**
 * Check if there exists a member with the specified ID.
 * @param id The id of the member.
 * @returns Whether the member with the ID exists.
 */
export const exists = async (id: string) => {
  const count = await prisma.member.count({
    where: { id },
  });

  return count > 0;
};

/**
 * Count the amount of members in the database.
 * @returns The member count.
 */
export const count = async () => {
  return await prisma.member.count();
};

/**
 * Delete member from the database.
 * @param id The id of the member.
 * @returns The deleted member.
 */
export const remove = async (id: string) => {
  return await prisma.member.delete({ where: { id } });
};
