import { Contact, Prisma } from "@prisma/client";

import { prisma } from "../prisma/client";

/**
 * Add new contact information to the database.
 * @param data The data the new contact information.
 * @returns The created contact information.
 */
export const create = async (
  data: Prisma.ContactCreateInput,
): Promise<Contact> => {
  return await prisma.contact.create({
    data,
  });
};

/**
 * Update contact information in the database.
 * @param id The id of the contact information to be updated.
 * @param data The data of the contact information to be updated.
 * @returns The updated contact information.
 */
export const update = async (
  id: string,
  data: Prisma.ContactUpdateInput,
): Promise<Contact> => {
  return await prisma.contact.update({
    where: { id },
    data,
  });
};

/**
 * Delete contact information from the database.
 * @returns The deleted contact information.
 */
export const remove = async (id: string): Promise<Contact> => {
  return await prisma.contact.delete({ where: { id } });
};
