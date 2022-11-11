import { Member, Prisma } from "@prisma/client";

import { prisma } from "../prisma/client";

/**
 * Add new member to the database.
 * @param data The data of the new member.
 * @returns The created member.
 */
export const create = async (
  data: Prisma.MemberCreateInput,
): Promise<Member> => {
  return await prisma.member.create({
    data,
  });
};

/**
 * Update member in the database.
 * @param id The id of the member to be updated.
 * @param data The updated data of the member.
 * @returns The updated member.
 */
export const update = async (
  id: string,
  data: Prisma.MemberUpdateInput,
): Promise<Member> => {
  return await prisma.member.update({
    where: { id },
    data,
  });
};

/**
 * Get a member from the database.
 * @param id The id of the member.
 * @returns The requested member if found, otherwise null.
 */
export const get = async (id: string): Promise<Member | null> => {
  return await prisma.member.findUnique({
    where: { id },
    include: {
      contacts: true,
      studies: true,
      memberships: true,
      address: true,
    },
  });
};

/**
 * Delete member from the database.
 * @param id The id of the member.
 * @returns The deleted member.
 */
export const remove = async (id: string): Promise<Member> => {
  return await prisma.member.delete({ where: { id } });
};
