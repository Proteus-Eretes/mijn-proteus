import { Quote } from "@prisma/client";
import { object, string, assert, size } from "superstruct";

import { quote, makeError } from "~~/logic";

const Body = object({
  content: size(string(), 4, 120),
  by: size(string(), 1, 50),
});

export default defineEventHandler<Quote>(async (e) => {
  const body = await readBody(e);

  try {
    assert(body, Body);
  } catch (e) {
    throw makeError(400, e);
  }

  return await quote.create(body);
});
