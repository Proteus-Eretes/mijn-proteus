import { apiError, ErrorCode } from "~/utils/error";
import { StudyMemberCreate, StudyMemberUpdate } from "~/server/validation";
import { prisma } from "~/server/prisma";

import { get as getStudy } from ".";

/**
 * Add new memberStudy to the database.
 * @param studyMember The study member to create.
 * @returns The created memberStudy.
 */
export const create = async (studyMember: StudyMemberCreate) => {
  if (!(await getStudy(studyMember.studyId))) {
    throw apiError(ErrorCode.NotFound, "The study was not found!");
  }

  return await prisma.memberStudy.create({
    data: studyMember,
  });
};

/**
 * Update memberStudy in the database.
 * @param id The id of the memberStudy to be updated
 * @param studyMember The updated memberStudy.
 * @returns The updated memberStudy.
 */
export const update = async (id: string, studyMember: StudyMemberUpdate) => {
  return await prisma.memberStudy.update({
    where: { id },
    data: studyMember,
  });
};

/**
 * Delete memberStudy from the database.
 * @returns The deleted memberStudy.
 */
export const remove = async (id: string) => {
  return await prisma.memberStudy.delete({ where: { id } });
};
