import {
  array,
  assign,
  defaulted,
  Describe,
  enums,
  Infer,
  nullable,
  object,
  omit,
  partial,
  size,
  string,
} from "superstruct";
import { Permission, Group as PrismaGroup } from "@prisma/client";

import { dateString, uuid } from "./utils";

/**
 * Complete group validator.
 * Validates all fields, but not the relations.
 * This validator is not intended for direct use, but other validators should build upon this.
 */
const Group: Describe<PrismaGroup> = object({
  id: uuid(),
  name: size(string(), 2, 50),
  description: size(string(), 0, 120),
  startDate: dateString(),
  stopDate: nullable(dateString()),
  permissions: array(enums(Object.values(Permission))),
  parentId: nullable(uuid()),
});

/**
 * Group creation struct.
 * It omits the ID of the group, and adds default description and permissions.
 */
export const GroupCreate = assign(
  omit(Group, ["id", "description", "permissions"]),
  object({
    description: defaulted(size(string(), 0, 120), ""),
    permissions: defaulted(array(enums(Object.values(Permission))), []),
  }),
);
// eslint-disable-next-line no-redeclare
export type GroupCreate = Infer<typeof GroupCreate>;

/**
 * Group update validator.
 * Similar to group creation, but all fields are optional.
 * If the fields are actually allowed to be editted is not defined here.
 */
export const GroupUpdate = partial(omit(Group, ["id"]));
// eslint-disable-next-line no-redeclare
export type GroupUpdate = Infer<typeof GroupUpdate>;
