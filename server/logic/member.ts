import type { Member, NameTitle, Sex, Prisma } from "@prisma/client";

import { prisma } from "~/server/prisma";

/**
 * Add new member to the database.
 * @param data The data of the new member.
 * @returns The created member.
 */
export const create = async (data: {
  title: NameTitle;
  initials: string;
  firstName: string;
  insertion: string;
  lastName: string;
  dateOfBirth: Date;
  sex: Sex;
  street: string;
  number: string;
  city: string;
  zipcode: string;
  country: string;
  contacts?: Prisma.ContactCreateWithoutMemberInput[];
}): Promise<Member> => {
  return await prisma.member.create({
    data: { ...data, contacts: { create: data.contacts } },
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
  data: {
    title?: NameTitle;
    street?: string;
    number?: string;
    city?: string;
    zipcode?: string;
    country?: string;
  },
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
export const remove = async (id: string): Promise<Member> => {
  return await prisma.member.delete({ where: { id } });
};
