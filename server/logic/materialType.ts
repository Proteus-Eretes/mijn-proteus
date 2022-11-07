import { MaterialType } from "@prisma/client";

import { prisma } from "../prisma/client";
import { makeError } from ".";

/**
 * Create a new material type.
 * @param name The name of the new material.
 * @param parentId The ID of the parent type, if it exists.
 * @returns The created material type.
 */
export const create = async (
  name: string,
  parentId?: string,
): Promise<MaterialType> => {
  if (parentId && !(await get(parentId))) {
    throw makeError(400, "The parent type was not found!");
  }

  return await prisma.materialType.create({
    data: {
      name,
      parentId,
    },
  });
};

/**
 * Get an unique material type by it's id.
 * @param id The id to get the type by.
 * @returns The material type if found, or null otherwise.
 */
export const get = async (id: string): Promise<MaterialType | null> => {
  return await prisma.materialType.findUnique({
    where: {
      id,
    },
  });
};

/**
 * Get a material type by it's name.
 * @param name The name of the type to get.
 * @returns The material type if found, or null otherwise.
 */
export const findByName = async (
  name: string,
): Promise<MaterialType | null> => {
  return await prisma.materialType.findUnique({
    where: {
      name,
    },
  });
};

/**
 * Get all material types.
 * @returns A list of all material types.
 */
export const getAll = async (): Promise<MaterialType[]> => {
  return await prisma.materialType.findMany();
};
