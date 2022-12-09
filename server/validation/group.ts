import {
  array,
  assign,
  defaulted,
  enums,
  Infer,
  object,
  omit,
  optional,
  partial,
  size,
  string,
} from "superstruct";
import { Permission } from "@prisma/client";

import { dateString, uuid } from "./utils";

/**
 * Complete group validator.
 * Validates all fields, but not the relations.
 * This validator is not intended for direct use, but other validators should build upon this.
 */
const GroupValidator = object({
  id: uuid(),
  name: size(string(), 2, 50),
  description: size(string(), 0, 120),
  startDate: dateString(),
  stopDate: optional(dateString()),
  permissions: array(enums(Object.values(Permission))),
  parentId: optional(uuid()),
});

/**
 * Group creation struct.
 * It omits the ID of the group, and adds default description and permissions.
 */
export const GroupCreateValidator = assign(
  omit(GroupValidator, ["id", "description", "permissions"]),
  object({
    description: defaulted(size(string(), 0, 120), ""),
    permissions: defaulted(array(enums(Object.values(Permission))), []),
  }),
);
export type GroupCreate = Infer<typeof GroupCreateValidator>;

/**
 * Group update validator.
 * Similar to group creation, but all fields are optional.
 * If the fields are actually allowed to be editted is not defined here.
 */
export const GroupUpdateValidator = partial(omit(GroupValidator, ["id"]));
export type GroupUpdate = Infer<typeof GroupUpdateValidator>;
