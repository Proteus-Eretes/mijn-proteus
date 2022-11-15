import { boolean, object, optional, size, string } from "superstruct";
import { readValidatedBody } from "~/server/utils";
import { group } from "~/server/logic";
import { dateString } from "~/server/validation";

const body = object({
  name: optional(size(string(), 2, 50)),
  description: optional(size(string(), 2, 120)),
  startDate: optional(dateString()),
  stopDate: optional(dateString()),
  allowMembers: optional(boolean()),
  allowSubgroups: optional(boolean()),
});

export default defineEventHandler(async (event) => {
  const id = await getRouterParam(event, "id");
  const data = await readValidatedBody(event, body);
  return await group.update(id, data);
});
