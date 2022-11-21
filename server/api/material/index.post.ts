import { object, string, size, optional } from "superstruct";

import { material } from "~~/server/logic";
import { readValidatedBody } from "~~/server/utils";
import { uuid } from "~~/server/validation";

const Body = object({
  name: size(string(), 2, 40),
  type: uuid(),
  comment: optional(size(string(), 1, 200)),
});

export default defineEventHandler(async (e) => {
  const body = await readValidatedBody(e, Body);

  return await material.create(body.name, body.type, body.comment);
});
