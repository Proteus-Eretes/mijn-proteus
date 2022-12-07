import { enums, object, optional, size, string } from "superstruct";
import { NameTitle } from "@prisma/client";

import { getValidatedRouterParam, readValidatedBody } from "~/server/utils";
import { member } from "~/server/logic";
import { uuid } from "~~/server/validation/utils";

const body = object({
  title: optional(enums(Object.values(NameTitle))),
  street: optional(size(string(), 1, 40)),
  number: optional(size(string(), 1, 40)),
  city: optional(size(string(), 1, 40)),
  zipcode: optional(size(string(), 1, 20)),
  country: optional(size(string(), 1, 40)),
});

export default defineEventHandler(async (event) => {
  const id = await getValidatedRouterParam(event, "id", uuid());
  const data = await readValidatedBody(event, body);
  return await member.update(id, data);
});
