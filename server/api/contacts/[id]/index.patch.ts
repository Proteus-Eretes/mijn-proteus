import { object, optional, size, string } from "superstruct";
import { contact } from "~/server/logic";
import { readValidatedBody } from "~/server/utils";

const body = object({
  value: optional(size(string(), 1, 120)),
});

export default defineEventHandler(async (event) => {
  const id = await getRouterParam(event, "id");
  const data = await readValidatedBody(event, body);
  return await contact.update(id, data);
});
