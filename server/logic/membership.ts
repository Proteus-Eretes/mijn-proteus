import { Membership, Prisma } from "@prisma/client";

import { prisma } from "../prisma/client";

/**
 * Add new membership to the database.
 * @param data The data of the membership.
 * @returns The created membership.
 */
export const create = async (
  data: Prisma.MembershipUncheckedCreateInput,
): Promise<Membership> => {
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
  data: Prisma.MembershipUpdateInput,
): Promise<Membership> => {
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
export const get = async (id: string): Promise<Membership | null> => {
  return await prisma.membership.findUnique({ where: { id } });
};

/**
 * Delete membership from the database.
 * @param id The id of the membership.
 * @returns The deleted membership.
 */
export const remove = async (id: string): Promise<Membership> => {
  return await prisma.membership.delete({ where: { id } });
};
