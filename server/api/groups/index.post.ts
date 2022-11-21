import { object, optional, size, string } from "superstruct";
import { group } from "~/server/logic";
import { readValidatedBody } from "~/server/utils";
import { dateString, uuid } from "~/server/validation";

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
