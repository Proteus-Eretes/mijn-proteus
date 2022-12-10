import {
  defaulted,
  Describe,
  Infer,
  object,
  omit,
  size,
  string,
} from "superstruct";
import { Material as PrismaMaterial } from "@prisma/client";

import { dateString, uuid } from "../utils";

export * from "./type";

/**
 * Complete material validator.
 * This has all fields, but is probably not useful on it's own.
 */
const Material: Describe<PrismaMaterial> = object({
  id: uuid(),
  name: size(string(), 2, 40),
  comment: size(string(), 0, 200),
  typeId: uuid(),
  lastUpdate: dateString(),
});

/**
 * Material creation struct.
 * It omits the ID of the material, and adds a default comment.
 */
export const MaterialCreate = defaulted(omit(Material, ["id", "lastUpdate"]), {
  comment: "",
});
// eslint-disable-next-line no-redeclare
export type MaterialCreate = Infer<typeof MaterialCreate>;

/**
 * Implicit material creation struct.
 * Same as material creation, but also omittes the type id.
 */
export const MaterialImplicitCreate = defaulted(
  omit(Material, ["id", "typeId", "lastUpdate"]),
  {
    comment: "",
  },
);
// eslint-disable-next-line no-redeclare
export type MaterialImplicitCreate = Infer<typeof MaterialImplicitCreate>;
