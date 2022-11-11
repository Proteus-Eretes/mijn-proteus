import { STATUS_CODES } from "http";

import { PrismaClientInitializationError } from "@prisma/client/runtime";
import { StructError } from "superstruct";

import { ApiError, ErrorCode, errorStatus } from "../error";
import { apiError } from "../utils";

/**
 * Nitro plugin which translates any thrown errors into an API error.
 * This allows us to get type-safety for errors even at the frontend.
 */
export default defineNitroPlugin((nitroApp) => {
  const oldHandler = nitroApp.h3App.handler;

  nitroApp.h3App.handler = defineEventHandler(async (e) => {
    try {
      return await oldHandler(e);
    } catch (err) {
      throw h3Error(transformErrors(err));
    }
  });
});

/**
 * Transforms an unknown error into an api error.
 * You can extend this function to add other errors to be transformed (e.g. from libraries).
 * @param err The received error.
 * @returns An api error.
 */
const transformErrors = (err: unknown): ApiError<ErrorCode> => {
  // Basic check if the error received is already an API error.
  if (err && typeof err === "object" && "code" in err) {
    return err as ApiError<ErrorCode>;
  }

  // The error is an SuperStruct error, so return a validation error.
  if (err instanceof StructError) {
    return apiError(ErrorCode.ValidationFailed, {
      message: err.message,
      key: err.key,
      got: err.value,
      expected: err.type,
      refinement: err.refinement,
    });
  }

  // Prisma is not conected, so return a server error.
  if (err instanceof PrismaClientInitializationError) {
    return apiError(ErrorCode.InternalError, "Database connection failed.");
  }

  // None of the errors matched, so we return a generic internal error.
  console.error("---------===============---------");
  console.error("Unknown error occured in request!");
  console.error(err);
  console.error("---------------------------------");
  return apiError(ErrorCode.InternalError, undefined);
};

/**
 * Translates an api error into an h3 error which can be returned for the correct http status.
 * @param err The API error which should be returned.
 * @returns An H3 error with the api error embedded correctly.
 */
const h3Error = (err: ApiError<ErrorCode>) =>
  createError({
    statusCode: errorStatus[err.code],
    statusMessage: STATUS_CODES[errorStatus[err.code]],
    data: {
      code: ErrorCode[err.code],
      context: err.context,
    },
    fatal: false,
    stack: undefined,
  });
