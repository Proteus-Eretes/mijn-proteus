import { Material } from "@prisma/client";

import { prisma } from "../prisma/client";
import { makeError, materialType } from ".";

/**
 * Add new material to the database.
 * @param name The name of the new material.
 * @param type The ID of the type.
 * @param comment Additional information about this material
 * @returns The created material.
 */
export const create = async (
  name: string,
  type: string,
  comment?: string,
): Promise<Material> => {
  if (!(await materialType.get(type))) {
    throw makeError(400, "The type for the material was not found!");
  }

  return await prisma.material.create({
    data: {
      typeId: type,
      name,
      comment,
    },
  });
};

/**
 * Get all materials.
 * @returns A list of all materials.
 */
export const getAll = async (): Promise<Material[]> => {
  return await prisma.material.findMany();
};
