import { StudyCreate, StudyUpdate } from "~~/server/validation";
import { prisma } from "~/server/prisma";

export * as member from "./member";

/**
 * Add new study to the database.
 * @param study The study to create.
 * @returns The created study.
 */
export const create = async (study: StudyCreate) => {
  return await prisma.study.create({
    data: study,
  });
};

/**
 * Update study in the database.
 * @param id The id of the study to be updated
 * @param data The updated data for the study.
 * @returns The updated study.
 */
export const update = async (id: string, data: StudyUpdate) => {
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
export const get = async (id: string) => {
  return await prisma.study.findUnique({ where: { id } });
};

/**
 * Get all studies from the database.
 * @returns An array of studies.
 */
export const getAll = async () => {
  return await prisma.study.findMany();
};

/**
 * Delete study from the database.
 * @returns The deleted study.
 */
export const remove = async (id: string) => {
  return await prisma.study.delete({ where: { id } });
};
