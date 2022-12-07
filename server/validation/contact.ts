import { ContactType } from "@prisma/client";
import {
  array,
  enums,
  Infer,
  object,
  omit,
  refine,
  size,
  string,
  union,
} from "superstruct";

import { uuid } from "./utils";

/**
 * Complete contact validator.
 * This has all fields, but is probably not useful on it's own.
 */
const ContactValidator = object({
  id: uuid(),
  type: enums(Object.values(ContactType)),
  value: size(string(), 1, 80),
  memberId: uuid(),
  groupId: uuid(),
});

/**
 * Creation of new contacts, with the associated object being received implicitly.
 */
export const ContactCreateImplicitValidator = omit(ContactValidator, [
  "id",
  "memberId",
  "groupId",
]);
export type ContactCreateImplicit = Infer<
  typeof ContactCreateImplicitValidator
>;

/**
 * Creation of new contacts, with the ID being provided.
 */
export const ContactCreateValidator = union([
  omit(ContactValidator, ["id", "memberId"]),
  omit(ContactValidator, ["id", "groupId"]),
]);
export type ContactCreate = Infer<typeof ContactCreateValidator>;

/**
 * Update an existing contact.
 */
export const ContactUpdateValidator = union([
  omit(ContactValidator, ["type", "memberId"]),
  omit(ContactValidator, ["type", "groupId"]),
]);
export type ContactUpdate = Infer<typeof ContactUpdateValidator>;

/**
 * Update an existing contact, with the associated object being received implicitly.
 */
export const ContactUpdateImplicitValidator = union([
  omit(ContactValidator, ["id", "type", "memberId"]),
  omit(ContactValidator, ["id", "type", "groupId"]),
]);
export type ContactUpdateImplicit = Infer<
  typeof ContactUpdateImplicitValidator
>;

/**
 * Makes sure that a list of contacts includes the required items.
 * Useful when creating a new object where contacts are used.
 */
export const requiredContact = refine(
  array(ContactCreateImplicitValidator),
  "requiredContacts",
  (contacts) => {
    if (!contacts.find((c) => c.type === ContactType.EMAIL)) {
      return "Contacts require an email address.";
    }

    if (!contacts.find((c) => c.type === ContactType.PHONE)) {
      return "Contacts require an phone number.";
    }

    return true;
  },
);
