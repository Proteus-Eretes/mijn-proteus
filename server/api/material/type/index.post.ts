import { MaterialType } from "@prisma/client";
import { object, string, size, optional } from "superstruct";

import { materialType } from "~~/logic";
import { readValidatedBody } from "~~/server/utils";
import { uuid } from "~~/server/validation";

const Body = object({
  name: size(string(), 2, 40),
  superId: optional(uuid()),
});

export default defineEventHandler<MaterialType>(async (e) => {
  const body = await readValidatedBody(e, Body);

  return await materialType.create(body.name, body.superId);
});
