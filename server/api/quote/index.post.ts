import { Quote } from "@prisma/client";
import { object, string, size } from "superstruct";

import { quote } from "~~/server/logic";
import { readValidatedBody } from "~~/server/utils";

const Body = object({
  content: size(string(), 4, 120),
  by: size(string(), 1, 50),
});

export default defineEventHandler<Quote>(async (e) => {
  const body = await readValidatedBody(e, Body);

  return await quote.create(body);
});
