import { defineEventHandler, getRouterParam } from "h3";
import { enums, object, size, string } from "superstruct";
import { Institution, StudyLevel } from "@prisma/client";
import { readValidatedBody } from "~/server/utils";
import { study } from "~/server/logic";

const body = object({
  name: size(string(), 2, 40),
  level: enums(Object.values(StudyLevel)),
  institution: enums(Object.values(Institution)),
});

export default defineEventHandler(async (event) => {
  const id = await getRouterParam(event, "id");
  const data = await readValidatedBody(event, body);
  return await study.updateOption(id, data);
});
