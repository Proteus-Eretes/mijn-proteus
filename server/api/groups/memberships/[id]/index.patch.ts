import { defineEventHandler, getRouterParam } from "h3";
import { boolean, date, enums, object, size, string } from "superstruct";
import { MemberType } from "@prisma/client";
import { membership } from "~/server/logic";
import { readValidatedBody } from "~/server/utils";

const body = object({
  function: size(string(), 2, 50),
  startDate: date(),
  stopDate: date(),
  isAdmin: boolean(),
  type: enums(Object.values(MemberType)),
});

export default defineEventHandler(async (event) => {
  const id = await getRouterParam(event, "id");
  const data = await readValidatedBody(event, body);
  return await membership.update(id, data);
});
