import { defineEventHandler } from "h3";
import { boolean, date, enums, object, size, string } from "superstruct";
import { MemberType } from "@prisma/client";
import { readValidatedBody } from "~/server/utils";
import { uuid } from "~/server/validation";
import { membership } from "~/server/logic";

const body = object({
  function: size(string(), 2, 50),
  startDate: date(),
  stopDate: date(),
  isAdmin: boolean(),
  type: enums(Object.values(MemberType)),
  memberId: uuid(),
  groupId: uuid(),
});

export default defineEventHandler(async (event) => {
  const data = await readValidatedBody(event, body);
  return await membership.create(data);
});
