import { enums, object, optional, size, string } from "superstruct";
import { NameTitle } from "@prisma/client";
import { readValidatedBody } from "~/server/utils";
import { member } from "~/server/logic";

const body = object({
  title: optional(enums(Object.values(NameTitle))),
  street: optional(size(string(), 1, 40)),
  number: optional(size(string(), 1, 40)),
  city: optional(size(string(), 1, 40)),
  zipcode: optional(size(string(), 1, 20)),
  country: optional(size(string(), 1, 40)),
});

export default defineEventHandler(async (event) => {
  const id = await getRouterParam(event, "id");
  const data = await readValidatedBody(event, body);
  return await member.update(id, data);
});
