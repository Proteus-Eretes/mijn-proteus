import { defineEventHandler, getRouterParam } from "h3";
import { date, enums, object, optional, size, string } from "superstruct";
import { NameTitle, Sex } from "@prisma/client";
import { readValidatedBody } from "~/server/utils";
import { member } from "~/server/logic";

const body = object({
  title: optional(enums(Object.values(NameTitle))),
  initials: optional(size(string(), 1, 10)),
  firstName: optional(size(string(), 1, 40)),
  insertion: optional(size(string(), 1, 10)),
  lastName: optional(size(string(), 1, 40)),
  dateOfBirth: optional(date()),
  sex: optional(enums(Object.values(Sex))),
});

export default defineEventHandler(async (event) => {
  const id = await getRouterParam(event, "id");
  const data = await readValidatedBody(event, body);
  return await member.update(id, data);
});
