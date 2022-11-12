import { Material } from "@prisma/client";

import { ErrorCode } from "../error";
import { apiError } from "../utils";
import { Database } from "./database";
import { materialType } from "./";

/**
 * Add new material to the database.
 * @param name The name of the new material.
 * @param type The ID of the type.
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

  const db = Database.get();

  return await db.material.create({
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
  const db = Database.get();
  return await db.material.findMany();
};
