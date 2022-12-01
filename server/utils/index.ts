import type { H3Event } from "h3";

import { assert, Struct } from "superstruct";

import { ApiError, ErrorCode, ErrorContext } from "~/server/error";

/**
 * Reads the body from a request, and validates it with the provided struct.
 * Throws an error when the body is invalid.
 * @param e The request event.
 * @param struct The struct to validate with.
 * @returns The validated body of the request.
 */
export async function readValidatedBody<T, S>(
  e: H3Event,
  struct: Struct<T, S>,
): Promise<T> {
  const body = await readBody(e);
  assert(body, struct);

  return body;
}

/**
 * Create an api error which can be thrown.
 * @param code The code of the error to create.
 * @param context Optional additional context for this error, content depends on the code.
 * @returns An api error which can be thrown to indicate a fault.
 */
export function apiError<T extends ErrorCode>(
  code: T,
  context: ErrorContext[T],
): ApiError<T> {
  return {
    _apierr: true,
    code,
    context,
  };
}
