import { boolean, date, object, optional, size, string } from "superstruct";

import { membership } from "~/server/logic";
import { readValidatedBody } from "~/server/utils";
import { uuid } from "~/server/validation";

const body = object({
  function: optional(size(string(), 2, 50)),
  startDate: date(),
  stopDate: optional(date()),
  isAdmin: boolean(),
  memberId: uuid(),
  groupId: uuid(),
});

export default defineEventHandler(async (event) => {
  const data = await readValidatedBody(event, body);
  return await membership.create(data);
});
