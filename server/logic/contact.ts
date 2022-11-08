import { Contact, ContactType } from "@prisma/client";

import { prisma } from "../prisma/client";
import { makeError } from "~/server/logic/index";

/**
 * Add new contact information to the database.
 * @param data The data of the new contact information.
 * @returns The created contact information.
 */
export const create = async (data: {
  value: string;
  type: ContactType;
  memberId?: string;
  groupId?: string;
}): Promise<Contact> => {
  if (!data.groupId && !data.memberId) {
    makeError(
      400,
      "Contact information must be linked to either a group or a member",
    );
  }
  return await prisma.contact.create({ data });
};

/**
 * Update contact information in the database.
 * @param id The id of the contact information to be updated
 * @param data The data for the contact information.
 * @returns The updated contact information.
 */
export const update = async (
  id: string,
  data: {
    value: string;
    type: ContactType;
  },
): Promise<Contact> => {
  return await prisma.contact.update({
    where: { id },
    data,
  });
};

/**
 * Get contact information from the database.
 * @param id The id of the contact information
 * @returns The requested contact information if found, otherwise null.
 */
export const get = async (id: string): Promise<Contact | null> => {
  return await prisma.contact.findUnique({ where: { id } });
};

/**
 * Get all contact information from the database.
 * @returns An array of members.
 */
export const getAll = async (): Promise<Contact[]> => {
  return await prisma.contact.findMany();
};

/**
 * Delete contact information from the database.
 * @returns The deleted contact information.
 */
export const remove = async (id: string): Promise<Contact> => {
  return await prisma.contact.delete({ where: { id } });
};
