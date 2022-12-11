import {
  array,
  assign,
  defaulted,
  Describe,
  enums,
  Infer,
  object,
  omit,
  partial,
  refine,
  size,
  string,
  union,
} from "superstruct";
import { ContactType, Contact as PrismaContact } from "@prisma/client";

import { optionalUuid, uuid } from "./utils";

/**
 * Complete contact validator.
 * This has all fields, but is probably not useful on it's own.
 */
const Contact: Describe<PrismaContact> = object({
  id: uuid(),
  type: enums(Object.values(ContactType)),
  value: size(string(), 1, 80),
  memberId: optionalUuid(),
  groupId: optionalUuid(),
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
export const ContactCreate = defaulted(
  union([
    assign(ContactCreateImplicit, object({ memberId: uuid() })),
    assign(ContactCreateImplicit, object({ groupId: uuid() })),
  ]),
  {
    memberId: null,
    groupId: null,
  },
);
// eslint-disable-next-line no-redeclare
export type ContactCreate = Infer<typeof ContactCreate>;

/**
 * Update an existing contact, with the associated object being received implicitly.
 */
export const ContactUpdateImplicit = partial(ContactCreateImplicit);
// eslint-disable-next-line no-redeclare
export type ContactUpdateImplicit = Infer<typeof ContactUpdateImplicit>;

/**
 * Update an existing contact.
 */
export const ContactUpdate = union([
  assign(ContactUpdateImplicit, partial(object({ memberId: uuid() }))),
  assign(ContactUpdateImplicit, partial(object({ groupId: uuid() }))),
]);
// eslint-disable-next-line no-redeclare
export type ContactUpdate = Infer<typeof ContactUpdate>;

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
