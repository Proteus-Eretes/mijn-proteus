import { object, optional, size, string } from "superstruct";

import { dateString, uuid } from "~/server/validation";
import { group } from "~/server/logic";
import { readValidatedBody } from "~/server/utils";

const body = object({
  name: size(string(), 2, 50),
  description: size(string(), 2, 120),
  startDate: dateString(),
  stopDate: dateString(),
  parentId: optional(uuid()),
});

export default defineEventHandler(async (event) => {
  const data = await readValidatedBody(event, body);
  return await group.create(data);
});
