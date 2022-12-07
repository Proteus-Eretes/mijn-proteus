import { boolean, date, object, optional, size, string } from "superstruct";

import { membership } from "~/server/logic";
import { getValidatedRouterParam, readValidatedBody } from "~/server/utils";
import { uuid } from "~~/server/validation/utils";

const body = object({
  function: optional(size(string(), 2, 50)),
  startDate: optional(date()),
  stopDate: optional(date()),
  isAdmin: optional(boolean()),
});

export default defineEventHandler(async (event) => {
  const id = await getValidatedRouterParam(event, "id", uuid());
  const data = await readValidatedBody(event, body);
  return await membership.update(id, data);
});
