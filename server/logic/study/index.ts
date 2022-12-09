import { apiError, ErrorCode } from "~/utils/error";
import { prisma } from "~/server/prisma";

import { get as getOption } from "./option";

export * as option from "./option";

/**
 * Add new memberStudy to the database.
 * @param data The data of the new memberStudy.
 * @returns The created memberStudy.
 */
export const create = async (data: {
  studentNumber?: string;
  startDate: Date;
  stopDate?: Date;
  memberId: string;
  studyId: string;
}) => {
  if (!(await getOption(data.studyId))) {
    throw apiError(ErrorCode.NotFound, "The study was not found!");
  }

  return await prisma.memberStudy.create({
    data,
  });
};

/**
 * Update memberStudy in the database.
 * @param id The id of the memberStudy to be updated
 * @param data The updated data for the memberStudy.
 * @returns The updated memberStudy.
 */
export const update = async (
  id: string,
  data: {
    studentNumber?: string;
    startDate?: Date;
    stopDate?: Date;
  },
) => {
  return await prisma.memberStudy.update({
    where: { id },
    data,
  });
};

/**
 * Delete memberStudy from the database.
 * @returns The deleted memberStudy.
 */
export const remove = async (id: string) => {
  return await prisma.memberStudy.delete({ where: { id } });
};
