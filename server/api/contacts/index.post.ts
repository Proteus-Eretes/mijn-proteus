import { defineEventHandler } from "h3";
import { enums, object, optional, size, string } from "superstruct";
import { ContactType } from "@prisma/client";
import { contact } from "~/server/logic";
import { readValidatedBody } from "~/server/utils";
import { uuid } from "~/server/validation";

const body = object({
  value: size(string(), 1, 120),
  type: enums(Object.values(ContactType)),
  memberId: optional(uuid()),
  groupId: optional(uuid()),
});

export default defineEventHandler(async (event) => {
  const data = await readValidatedBody(event, body);
  return await contact.create(data);
});
