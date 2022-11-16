import { define } from "superstruct";

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

/**
 * Superstruct validator for a date string.
 */
export const dateString = () =>
  define<string>("dateString", (val) => {
    if (typeof val !== "string") {
      return false;
    }

    return validator.isDate(val);
  });
