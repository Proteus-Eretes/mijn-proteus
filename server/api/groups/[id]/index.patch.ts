import { defineEventHandler, getRouterParam } from "h3";
import { date, object, optional, size, string } from "superstruct";
import { readValidatedBody } from "~/server/utils";
import { group } from "~/server/logic";

const body = object({
  name: optional(size(string(), 2, 50)),
  description: optional(size(string(), 2, 120)),
  startDate: optional(date()),
  stopDate: optional(date()),
});

export default defineEventHandler(async (event) => {
  const id = await getRouterParam(event, "id");
  const data = await readValidatedBody(event, body);
  return await group.update(id, data);
});
