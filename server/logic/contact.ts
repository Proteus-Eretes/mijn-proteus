import { prisma } from "~/server/prisma";
import { ErrorCode, apiError } from "~/utils/error";
import { group, member } from "~/server/logic";
import { ContactCreate, ContactUpdate } from "~/server/validation";

/**
 * Add new contact information to the database.
 * @param contact The data the new contact information.
 * @returns The created contact information.
 */
export const create = async (contact: ContactCreate) => {
  if ("memberId" in contact && !(await member.get(contact.memberId))) {
    throw apiError(ErrorCode.NotFound, "Member not found!");
  }

  if ("groupId" in contact && !(await group.get(contact.groupId))) {
    throw apiError(ErrorCode.NotFound, "Group not found!");
  }

  return await prisma.contact.create({
    data: contact,
  });
};

/**
 * Update contact information in the database.
 * @param contact The contact information to update.
 * @returns The updated contact information.
 */
export const update = async (contact: ContactUpdate) => {
  return await prisma.contact.update({
    where: { id: contact.id },
    data: contact,
  });
};

/**
 * Delete contact information from the database.
 * @returns The deleted contact information.
 */
export const remove = async (id: string) => {
  return await prisma.contact.delete({ where: { id } });
};
