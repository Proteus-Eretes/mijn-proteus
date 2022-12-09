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
import { ContactType } from "@prisma/client";

import { uuid } from "./utils";

/**
 * Complete contact validator.
 * This has all fields, but is probably not useful on it's own.
 */
const Contact = object({
  id: uuid(),
  type: enums(Object.values(ContactType)),
  value: size(string(), 1, 80),
  memberId: uuid(),
  groupId: uuid(),
});

/**
 * Creation of new contacts, with the associated object being received implicitly.
 */
export const ContactCreateImplicit = omit(Contact, [
  "id",
  "memberId",
  "groupId",
]);
// eslint-disable-next-line no-redeclare
export type ContactCreateImplicit = Infer<typeof ContactCreateImplicit>;

/**
 * Creation of new contacts, with the ID being provided.
 */
export const ContactCreate = union([
  omit(Contact, ["id", "memberId"]),
  omit(Contact, ["id", "groupId"]),
]);
// eslint-disable-next-line no-redeclare
export type ContactCreate = Infer<typeof ContactCreate>;

/**
 * Update an existing contact.
 */
export const ContactUpdate = union([
  omit(Contact, ["type", "memberId"]),
  omit(Contact, ["type", "groupId"]),
]);
// eslint-disable-next-line no-redeclare
export type ContactUpdate = Infer<typeof ContactUpdate>;

/**
 * Update an existing contact, with the associated object being received implicitly.
 */
export const ContactUpdateImplicit = union([
  omit(Contact, ["id", "type", "memberId"]),
  omit(Contact, ["id", "type", "groupId"]),
]);
// eslint-disable-next-line no-redeclare
export type ContactUpdateImplicit = Infer<typeof ContactUpdateImplicit>;

/**
 * Makes sure that a list of contacts includes the required items.
 * Useful when creating a new object where contacts are used.
 */
export const requiredContact = refine(
  array(ContactCreateImplicit),
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
