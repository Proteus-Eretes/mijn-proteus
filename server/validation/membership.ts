import {
  assign,
  boolean,
  date,
  defaulted,
  Infer,
  object,
  omit,
  optional,
  partial,
  size,
  string,
} from "superstruct";

import { dateString, uuid } from "./utils";

/**
 * Complete membership validator.
 * Validates all fields, but not the relations.
 * This validator is not intended for direct use, but other validators should build upon this.
 */
const Membership = object({
  id: uuid(),
  function: size(string(), 0, 50),
  startDate: dateString(),
  stopDate: optional(date()),
  isAdmin: boolean(),
  memberId: optional(uuid()),
  groupId: uuid(),
});

/**
 * Membership creation struct.
 * It omits the ID of the membership, and adds default values.
 */
export const MembershipCreate = assign(
  omit(Membership, ["id", "function", "startDate", "isAdmin"]),
  object({
    function: defaulted(size(string(), 0, 50), ""),
    startDate: defaulted(dateString(), new Date()),
    isAdmin: defaulted(boolean(), false),
  }),
);
// eslint-disable-next-line no-redeclare
export type MembershipCreate = Infer<typeof MembershipCreate>;

/**
 * Membership update validator.
 * Similar to membership creation, but all fields are optional.
 * If the fields are actually allowed to be editted is not defined here.
 */
export const MembershipUpdate = partial(omit(Membership, ["id"]));
// eslint-disable-next-line no-redeclare
export type MembershipUpdate = Infer<typeof MembershipUpdate>;
