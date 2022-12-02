import { Contact, ContactType } from "@prisma/client";

import { prisma } from "~/server/prisma";
import { apiError } from "~/server/utils";
import { ErrorCode } from "~/server/error";
import { group, member } from "~/server/logic";

/**
 * Add new contact information to the database.
 * @param data The data the new contact information.
 * @returns The created contact information.
 */
export const create = async (data: {
  value: string;
  type: ContactType;
  memberId?: string;
  groupId?: string;
}): Promise<Contact> => {
  if (!data.memberId && !data.memberId) {
    throw apiError(ErrorCode.ValidationFailed, {
      message: "No memberId or groupId provided",
      key: "memberId or groupId",
      got: "undefined",
      expected: "Either memberId or groupId to be defined",
    });
  }
  if (data.memberId && !(await member.get(data.memberId))) {
    throw apiError(ErrorCode.NotFound, "Member not found!");
  }
  if (data.groupId && !(await group.get(data.groupId))) {
    throw apiError(ErrorCode.NotFound, "Group not found!");
  }

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
  data: {
    value?: string;
  },
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
