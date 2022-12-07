import type { H3Event } from "h3";

import { create, Struct } from "superstruct";

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

  return create(body, struct);
}

/**
 * Read a body parameter and validate it with SuperStruct.
 * @param e The request event.
 * @param name The name of the parameter.
 * @param struct The validation struct to use.
 * @returns The router parameter.
 */
export async function getValidatedRouterParam<T, S>(
  e: H3Event,
  name: string,
  struct: Struct<T, S>,
): Promise<T> {
  const body = await getRouterParam(e, name);

  return create(body, struct);
}
