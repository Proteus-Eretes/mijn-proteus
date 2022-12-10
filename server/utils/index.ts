import type { H3Event } from "h3";

import { assert, Struct } from "superstruct";

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
