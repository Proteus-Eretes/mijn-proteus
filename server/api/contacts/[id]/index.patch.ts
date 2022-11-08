import { defineEventHandler, getRouterParam } from "h3";
import { ContactType } from "@prisma/client";
import { enums, object, size, string } from "superstruct";
import { contact } from "~/server/logic";
import { readValidatedBody } from "~/server/utils";

const body = object({
  value: size(string(), 1, 120),
  type: enums(Object.values(ContactType)),
});

export default defineEventHandler(async (event) => {
  const id = await getRouterParam(event, "id");
  const data = await readValidatedBody(event, body);
  return await contact.update(id, data);
});
