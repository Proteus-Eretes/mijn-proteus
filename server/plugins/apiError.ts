import { STATUS_CODES } from "http";

import { H3Error } from "h3";
// eslint-disable-next-line import/no-internal-modules
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/index.js";
import { StructError } from "superstruct";

import { apiError, ApiError, ErrorCode, errorStatus } from "~/utils/error";

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
      if (err instanceof H3Error) {
        // The error is already an H3 error, so we we just return it.
        throw err;
      }

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
  if (err && typeof err === "object" && "_apierr" in err) {
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

  // A documented Prisma error occured.
  if (err instanceof PrismaClientKnownRequestError) {
    const target = err.meta?.target as unknown as Record<string, unknown>;
    const targetName = target?.name as unknown as string | undefined;

    switch (err.code) {
      case "P2002":
        // Unique constraint validation.
        return apiError(ErrorCode.Exists, {
          message: `Instance with "${targetName}" already exists with the same name.`,
          field: targetName,
        });
      case "P2025":
        // An operation failed because it depends on one or more records that were required but not found.
        return apiError(ErrorCode.NotFound, "Database entry not found.");
      default:
        // Error is not covered.
        return apiError(
          ErrorCode.InternalError,
          `Database Error (${err.code})`,
        );
    }
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
export const h3Error = (err: ApiError<ErrorCode>) =>
  createError({
    statusCode: errorStatus[err.code],
    statusMessage: STATUS_CODES[errorStatus[err.code]],
    data: err,
    fatal: false,
    stack: undefined,
  });
