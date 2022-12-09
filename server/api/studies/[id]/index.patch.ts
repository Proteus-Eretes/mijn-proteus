import { date, object, optional, size, string } from "superstruct";

import { getValidatedRouterParam, readValidatedBody } from "~/server/utils";
import { study } from "~/server/logic";
import { uuid } from "~~/server/validation";

const body = object({
  studentNumber: optional(size(string(), 1, 40)),
  startDate: optional(date()),
  stopDate: optional(date()),
});

export default defineEventHandler(async (event) => {
  const id = await getValidatedRouterParam(event, "id", uuid());
  const data = await readValidatedBody(event, body);
  return await study.update(id, data);
});
