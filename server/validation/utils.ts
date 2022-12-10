import { coerce, date, define, nullable, string } from "superstruct";
import validator from "validator";

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

export const optionalUuid = () =>
  coerce(nullable(uuid()), string(), (v) => {
    if (v === "") {
      return null;
    }

    return v;
  });

/**
 * Superstruct validator for a date string.
 * This converts the string into a date object.
 */
export const dateString = () =>
  coerce(date(), string(), (date) => new Date(date));
