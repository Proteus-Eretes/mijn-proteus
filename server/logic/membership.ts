import { Membership, MemberType } from "@prisma/client";

import { prisma } from "../prisma/client";

/**
 * Add new membership to the database.
 * @param data The data of the new membership.
 * @returns The created membership.
 */
export const create = async (data: {
  function: string;
  startDate: Date;
  stopDate: Date;
  type: MemberType;
  groupId: string;
  memberId: string;
}): Promise<Membership> => {
  return await prisma.membership.create({ data });
};

/**
 * Update membership in the database.
 * @param id The id of the membership to be updated
 * @param data The data for the membership.
 * @returns The updated membership.
 */
export const update = async (
  id: string,
  data: {
    function: string;
    startDate: Date;
    stopDate: Date;
    type: MemberType;
  },
): Promise<Membership> => {
  return await prisma.membership.update({
    where: { id },
    data,
  });
};
/**
 * Get a membership from the database.
 * @param id The id of the membership
 * @returns The requested membership if found, otherwise null.
 */
export const get = async (id: string): Promise<Membership | null> => {
  return await prisma.membership.findUnique({ where: { id } });
};

/**
 * Delete membership from the database.
 * @returns The deleted membership.
 */
export const remove = async (id: string): Promise<Membership> => {
  return await prisma.membership.delete({ where: { id } });
};

/**
 * Get all memberships of a group.
 * @returns A list of all memberships of a group if found, otherwise null.
 */
export const getAllOfGroup = async (
  id: string,
): Promise<Membership[] | null> => {
  return await prisma.group.findUnique({ where: { id } }).members();
};

/**
 * Get all memberships of a member.
 * @returns A list of all memberships of a member if found, otherwise null.
 */
export const getAllOfMember = async (
  id: string,
): Promise<Membership[] | null> => {
  return await prisma.member.findUnique({ where: { id } }).memberships();
};
