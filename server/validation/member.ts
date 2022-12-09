import { NameTitle, Sex } from "@prisma/client";
import {
  assign,
  enums,
  Infer,
  object,
  omit,
  optional,
  partial,
  size,
  string,
} from "superstruct";

import { requiredContact } from "./contact";
import { dateString, uuid } from "./utils";

/**
 * Complete member validator.
 * Validates all fields, but not the relations.
 * This validator is not intended for direct use, but other validators should build upon this.
 */
const MemberValidator = object({
  id: uuid(),
  title: enums(Object.values(NameTitle)),
  initials: size(string(), 1, 10),
  firstName: size(string(), 1, 40),
  insertion: optional(size(string(), 1, 10)),
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
 * It omits the ID of the member, and requires valid contacts to be added.
 */
export const MemberCreateValidator = assign(
  omit(MemberValidator, ["id"]),
  object({ contacts: requiredContact }),
);
export type MemberCreate = Infer<typeof MemberCreateValidator>;

/**
 * Member update validator.
 * Simulair to member creation, but all fields are optional and does not allow for contacts to be updated.
 * If the fields are actually allowed to be editted is not defined here.
 */
export const MemberUpdateValidator = partial(omit(MemberValidator, ["id"]));
export type MemberUpdate = Infer<typeof MemberUpdateValidator>;