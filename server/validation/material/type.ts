import {
  defaulted,
  Describe,
  Infer,
  object,
  omit,
  size,
  string,
} from "superstruct";
import { MaterialType as PrismaMaterialType } from "@prisma/client";

import { optionalUuid, uuid } from "../utils";

/**
 * Complete materialtype validator.
 * This has all fields, but is probably not useful on it's own.
 */
const MaterialType: Describe<PrismaMaterialType> = object({
  id: uuid(),
  name: size(string(), 2, 40),
  parentId: optionalUuid(),
});

/**
 * Materialtype creation struct.
 * It omits the ID of the materialtype, and adds a default comment.
 */
export const MaterialTypeCreate = defaulted(omit(MaterialType, ["id"]), {
  parentId: null,
});
// eslint-disable-next-line no-redeclare
export type MaterialTypeCreate = Infer<typeof MaterialTypeCreate>;
