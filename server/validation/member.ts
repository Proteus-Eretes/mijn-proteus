import {
  assign,
  defaulted,
  Describe,
  enums,
  Infer,
  object,
  omit,
  partial,
  size,
  string,
} from "superstruct";
import { NameTitle, Member as PrismaMember, Sex } from "@prisma/client";

import { dateString, uuid } from "./utils";
import { requiredContact } from "./contact";

/**
 * Complete member validator.
 * Validates all fields, but not the relations.
 * This validator is not intended for direct use, but other validators should build upon this.
 */
const Member: Describe<PrismaMember> = object({
  id: uuid(),
  title: enums(Object.values(NameTitle)),
  initials: size(string(), 1, 10),
  firstName: size(string(), 1, 40),
  insertion: size(string(), 0, 10),
  lastName: size(string(), 1, 40),
  dateOfBirth: dateString(),
  sex: enums(Object.values(Sex)),
  street: size(string(), 1, 40),
  number: size(string(), 1, 40),
  city: size(string(), 1, 40),
  zipcode: size(string(), 1, 20),
  country: size(string(), 1, 40),
});

/**
 * Member creation struct.
 * It omits the ID of the member, requires valid contacts, and provides a default title.
 */
export const MemberCreate = defaulted(
  assign(
    omit(Member, ["id"]),
    object({
      contacts: requiredContact,
    }),
  ),
  {
    title: NameTitle.NONE,
    insertion: "",
  },
);
// eslint-disable-next-line no-redeclare
export type MemberCreate = Infer<typeof MemberCreate>;

/**
 * Member update validator.
 * Similar to member creation, but all fields are optional and does not allow for contacts to be updated.
 * If the fields are actually allowed to be editted is not defined here.
 */
export const MemberUpdate = partial(omit(Member, ["id"]));
// eslint-disable-next-line no-redeclare
export type MemberUpdate = Infer<typeof MemberUpdate>;
