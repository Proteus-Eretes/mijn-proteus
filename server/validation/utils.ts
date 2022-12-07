import { ContactType } from "@prisma/client";
import { array, coerce, date, define, refine, string } from "superstruct";

import validator from "validator";

import { ContactCreateImplicitValidator } from "./contact";

/**
 * Superstruct validator for an uuid.
 * @param version The version of uuid to use. v4 by default.
 */
export const uuid = (version: 3 | 4 | 5 | "all" = 4) =>
  define<string>("uuid", (val) => {
    if (typeof val !== "string") {
      return false;
    }

    return validator.isUUID(val, version);
  });

/**
 * Superstruct validator for a date string.
 * This converts the string into a date object.
 */
export const dateString = () =>
  coerce(date(), string(), (date) => new Date(date));

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
