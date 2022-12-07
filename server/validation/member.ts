import { NameTitle, Sex } from "@prisma/client";
import {
  defaulted,
  enums,
  Infer,
  object,
  optional,
  size,
  string,
} from "superstruct";

import { dateString, requiredContact } from "./utils";

export const MemberCreateValidator = object({
  title: defaulted(enums(Object.values(NameTitle)), NameTitle.NONE),
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
  contacts: requiredContact,
});
export type MemberCreate = Infer<typeof MemberCreateValidator>;
