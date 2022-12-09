import { Institution, Study, StudyLevel } from "@prisma/client";

import { prisma } from "~/server/prisma";

/**
 * Add new study to the database.
 * @param data The data of the new study.
 * @returns The created study.
 */
export const create = async (data: {
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
export const update = async (
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
export const get = async (id: string): Promise<Study | null> => {
  return await prisma.study.findUnique({ where: { id } });
};

/**
 * Get all studies from the database.
 * @returns An array of studies.
 */
export const getAll = async (): Promise<Study[]> => {
  return await prisma.study.findMany();
};

/**
 * Delete study from the database.
 * @returns The deleted study.
 */
export const remove = async (id: string): Promise<Study> => {
  return await prisma.study.delete({ where: { id } });
};
