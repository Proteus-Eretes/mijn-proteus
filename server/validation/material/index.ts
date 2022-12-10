import {
  assign,
  defaulted,
  Infer,
  object,
  omit,
  size,
  string,
} from "superstruct";

import { uuid } from "../utils";

export * from "./type";

/**
 * Complete material validator.
 * This has all fields, but is probably not useful on it's own.
 */
const Material = object({
  id: uuid(),
  name: size(string(), 2, 40),
  typeId: uuid(),
  comment: size(string(), 1, 200),
});

/**
 * Material creation struct.
 * It omits the ID of the material, and adds a default comment.
 */
export const MaterialCreate = assign(
  omit(Material, ["id", "comment"]),
  object({
    comment: defaulted(size(string(), 0, 200), ""),
  }),
);
// eslint-disable-next-line no-redeclare
export type MaterialCreate = Infer<typeof MaterialCreate>;

/**
 * Implicit material creation struct.
 * Same as material creation, but also omittes the type id.
 */
export const MaterialImplicitCreate = omit(MaterialCreate, ["typeId"]);
// eslint-disable-next-line no-redeclare
export type MaterialImplicitCreate = Infer<typeof MaterialImplicitCreate>;
