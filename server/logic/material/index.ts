import { MaterialCreate } from "~~/server/validation";
import { prisma } from "~/server/prisma";

export * as type from "./type";

/**
 * Add new material to the database.
 * @param material the material to create.
 * @returns The created material.
 */
export const create = async (material: MaterialCreate) => {
  return await prisma.material.create({
    data: material,
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
 * @returns The material if found, null otherwise.
 */
export const findByName = async (name: string) => {
  return await prisma.material.findUnique({
    where: {
      name,
    },
  });
};
