import type { H3Event } from "h3";

import { assert, Struct } from "superstruct";

import { makeError } from "~~/server/logic";

export async function readValidatedBody<T, S>(
  e: H3Event,
  struct: Struct<T, S>,
): Promise<T> {
  const body = await readBody(e);

  try {
    assert(body, struct);
  } catch (e) {
    throw makeError(400, e);
  }

  return body;
}
