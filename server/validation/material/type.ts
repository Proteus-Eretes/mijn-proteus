import { Infer, object, omit, optional, size, string } from "superstruct";

import { uuid } from "../utils";

/**
 * Complete materialtype validator.
 * This has all fields, but is probably not useful on it's own.
 */
const MaterialType = object({
  id: uuid(),
  name: size(string(), 2, 40),
  parentId: optional(uuid()),
});

/**
 * Materialtype creation struct.
 * It omits the ID of the materialtype, and adds a default comment.
 */
export const MaterialTypeCreate = omit(MaterialType, ["id"]);
// eslint-disable-next-line no-redeclare
export type MaterialTypeCreate = Infer<typeof MaterialTypeCreate>;
