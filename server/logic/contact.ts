import { apiError, ErrorCode } from "~/utils/error";
import { ContactCreate, ContactUpdate } from "~/server/validation";
import { group, member } from "~/server/logic";
import { prisma } from "~/server/prisma";

/**
 * Add new contact information to the database.
 * @param contact The data the new contact information.
 * @returns The created contact information.
 */
export const create = async (contact: ContactCreate) => {
  if ("memberId" in contact && contact.memberId) {
    if (!(await member.get(contact.memberId))) {
      throw apiError(ErrorCode.NotFound, "Member not found!");
    }
  }

  if ("groupId" in contact && contact.groupId) {
    if (!(await group.get(contact.groupId))) {
      throw apiError(ErrorCode.NotFound, "Group not found!");
    }
  }

  return await prisma.contact.create({
    data: contact,
  });
};

/**
 * Update contact information in the database.
 * @param id The ID of the contact to update.
 * @param contact The contact information to update.
 * @returns The updated contact information.
 */
export const update = async (id: string, contact: ContactUpdate) => {
  return await prisma.contact.update({
    where: { id },
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
