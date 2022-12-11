import { apiError, ErrorCode } from "~/utils/error";
import { MaterialTypeCreate } from "~~/server/validation";
import { prisma } from "~/server/prisma";

/**
 * Create a new material type.
 * @param materialType The material type to create.
 * @returns The created material type.
 */
export const create = async (materialType: MaterialTypeCreate) => {
  if (materialType.parentId && !(await get(materialType.parentId))) {
    throw apiError(ErrorCode.NotFound, "The parent type was not found!");
  }

  if (await findByName(materialType.name)) {
    throw apiError(ErrorCode.Exists, {
      message: `Material type "${materialType.name}" already exists.`,
      field: "name",
    });
  }

  return await prisma.materialType.create({
    data: materialType,
  });
};

/**
 * Get an unique material type by its id.
 * @param id The id to get the type by.
 * @returns The material type if found, or null otherwise.
 */
export const get = async (id: string) => {
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
export const findByName = async (name: string) => {
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
export const getAll = async () => {
  return await prisma.materialType.findMany();
};

/**
 * Get all material types with their parents information.
 * @returns A list of all material types with the parents name.
 */
export const getAllWithParent = async () => {
  return await prisma.materialType.findMany({
    include: {
      parent: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
};
