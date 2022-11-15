import { boolean, date, object, optional, size, string } from "superstruct";
import { membership } from "~/server/logic";
import { readValidatedBody } from "~/server/utils";

const body = object({
  function: optional(size(string(), 2, 50)),
  startDate: optional(date()),
  stopDate: optional(date()),
  isAdmin: optional(boolean()),
});

export default defineEventHandler(async (event) => {
  const id = await getRouterParam(event, "id");
  const data = await readValidatedBody(event, body);
  return await membership.update(id, data);
});
