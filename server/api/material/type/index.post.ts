import { object, string, size, optional } from "superstruct";

import { materialType } from "~~/server/logic";
import { readValidatedBody } from "~~/server/utils";
import { uuid } from "~~/server/validation";

const Body = object({
  name: size(string(), 2, 40),
  parentId: optional(uuid()),
});

export default defineEventHandler(async (e) => {
  const body = await readValidatedBody(e, Body);

  return await materialType.create(body.name, body.parentId);
});
