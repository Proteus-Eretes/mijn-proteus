import { defineEventHandler, getRouterParam } from "h3";
import { date, object, optional, size, string } from "superstruct";
import { readValidatedBody } from "~/server/utils";
import { study } from "~/server/logic";

const body = object({
  studyNumber: optional(size(string(), 1, 40)),
  startDate: optional(date()),
  stopDate: optional(date()),
});

export default defineEventHandler(async (event) => {
  const id = await getRouterParam(event, "id");
  const data = await readValidatedBody(event, body);
  return await study.update(id, data);
});
