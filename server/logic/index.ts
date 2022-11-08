import { STATUS_CODES } from "http";

export * as contact from "./contact";
export * as group from "./group";
export * as material from "./material";
export * as materialType from "./materialType";
export * as member from "./member";
export * as membership from "./membership";
export * as quote from "./quote";
export * as study from "./study";

/**
 * Helper to create a nuxt error object for error responses.
 * @param statusCode The HTTP status code to use.
 * @param err The error/message to attach to the error.
 * @returns A Nuxt error response.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const makeError = (statusCode: number, err: any) => {
  return createError({
    statusCode,
    statusMessage: STATUS_CODES[statusCode.toString()],
    message: err?.message || err || "Internal Server Error",
    fatal: false,
    stack: undefined,
  });
};
