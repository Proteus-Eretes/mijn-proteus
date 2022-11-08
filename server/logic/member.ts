import { Member, NameTitle, Sex } from "@prisma/client";

import { prisma } from "../prisma/client";

/**
 * Add new member to the database.
 * @param member The data of the new member.
 * @param address The address if the new member.
 * @returns The created member.
 */
export const create = async (
  member: {
    title: NameTitle;
    initials: string;
    firstName: string;
    insertion?: string;
    lastName: string;
    dateOfBirth: Date;
    sex: Sex;
  },
  address: {
    street: string;
    number: string;
    city: string;
    zipcode: string;
    country: string;
  },
): Promise<Member> => {
  return await prisma.member.create({
    data: {
      ...member,
      address: {
        create: address,
      },
    },
  });
};

/**
 * Update member in the database.
 * @param id The id of the member to be updated
 * @param data The data for the member.
 * @returns The updated member.
 */
export const update = async (
  id: string,
  data: {
    title?: NameTitle;
    initials?: string;
    firstName?: string;
    insertion?: string;
    lastName?: string;
    dateOfBirth?: Date;
    sex?: Sex;
  },
): Promise<Member> => {
  return await prisma.member.update({
    where: { id },
    data,
  });
};

/**
 * Get a member from the database.
 * @param id The id of the member
 * @returns The requested member if found, otherwise null.
 */
export const get = async (id: string): Promise<Member | null> => {
  return await prisma.member.findUnique({ where: { id } });
};

/**
 * Get all members from the database.
 * @returns An array of members.
 */
export const getAll = async (): Promise<Member[]> => {
  return await prisma.member.findMany();
};

/**
 * Delete member from the database.
 * @returns The deleted member.
 */
export const remove = async (id: string): Promise<Member> => {
  return await prisma.member.delete({ where: { id } });
};
