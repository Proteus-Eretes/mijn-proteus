import { Material } from "@prisma/client";

import { ErrorCode } from "../error";
import { apiError } from "../utils";
import { prisma } from "../prisma/client";
import { materialType } from "./";

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
    throw apiError(
      ErrorCode.NotFound,
      "The type for the material was not found!",
    );
  }

  if (await findByName(name)) {
    throw apiError(ErrorCode.Exists, {
      message: `Material "${name}" already exists.`,
      field: "name",
    });
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

/**
 * Get a material by it's name.
 * @param name The name of the material to find.
 * @returns The material if found, or null otherwise.
 */
export const findByName = async (name: string): Promise<Material | null> => {
  return await prisma.material.findUnique({
    where: {
      name,
    },
  });
};
