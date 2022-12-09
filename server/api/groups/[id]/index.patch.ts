import { object, optional, size, string } from "superstruct";

import { dateString, uuid } from "~~/server/validation";
import { getValidatedRouterParam, readValidatedBody } from "~/server/utils";
import { group } from "~/server/logic";

const body = object({
  name: optional(size(string(), 2, 50)),
  description: optional(size(string(), 2, 120)),
  startDate: optional(dateString()),
  stopDate: optional(dateString()),
});

export default defineEventHandler(async (event) => {
  const id = await getValidatedRouterParam(event, "id", uuid());
  const data = await readValidatedBody(event, body);
  return await group.update(id, data);
});
