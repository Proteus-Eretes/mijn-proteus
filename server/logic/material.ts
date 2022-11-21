import { prisma } from "../prisma/client";

/**
 * Add new material to the database.
 * @param name The name of the new material.
 * @param type The ID of the type.
 * @param comment Additional information about this material
 * @returns The created material.
 */
export const create = async (name: string, type: string, comment?: string) => {
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
export const getAll = async () => {
  return await prisma.material.findMany();
};

/**
 * Get a material by it's name.
 * @param name The name of the material to find.
 * @returns The material if found, or null otherwise.
 */
export const findByName = async (name: string) => {
  return await prisma.material.findUnique({
    where: {
      name,
    },
  });
};
