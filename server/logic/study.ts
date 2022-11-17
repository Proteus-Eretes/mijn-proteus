import { MemberStudy, Study, StudyLevel, Institution } from "@prisma/client";
import { prisma } from "../prisma/client";

import { apiError } from "../utils";
import { ErrorCode } from "../error";

/**
 * Add new study to the database.
 * @param data The data of the new study.
 * @returns The created study.
 */
export const createOption = async (data: {
  name: string;
  level: StudyLevel;
  institution: Institution;
}): Promise<Study> => {
  return await prisma.study.create({
    data,
  });
};

/**
 * Update study in the database.
 * @param id The id of the study to be updated
 * @param data The updated data for the study.
 * @returns The updated study.
 */
export const updateOption = async (
  id: string,
  data: {
    name?: string;
    level?: StudyLevel;
    institution?: Institution;
  },
): Promise<Study> => {
  return await prisma.study.update({
    where: { id },
    data,
  });
};

/**
 * Get a study from the database.
 * @param id The id of the study.
 * @returns A study if found, otherwise null.
 */
export const getOption = async (id: string): Promise<Study | null> => {
  return await prisma.study.findUnique({ where: { id } });
};

/**
 * Get all studies from the database.
 * @returns An array of studies.
 */
export const getAllOptions = async (): Promise<Study[]> => {
  return await prisma.study.findMany();
};

/**
 * Delete study from the database.
 * @returns The deleted study.
 */
export const removeOption = async (id: string): Promise<Study> => {
  return await prisma.study.delete({ where: { id } });
};

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
}): Promise<MemberStudy> => {
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
): Promise<MemberStudy> => {
  return await prisma.memberStudy.update({
    where: { id },
    data,
  });
};

/**
 * Delete memberStudy from the database.
 * @returns The deleted memberStudy.
 */
export const remove = async (id: string): Promise<MemberStudy> => {
  return await prisma.memberStudy.delete({ where: { id } });
};
