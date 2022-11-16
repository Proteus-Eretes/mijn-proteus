import { enums, object, optional, size, string } from "superstruct";
import { Institution, StudyLevel } from "@prisma/client";
import { readValidatedBody } from "~/server/utils";
import { study } from "~/server/logic";

const body = object({
  name: optional(size(string(), 2, 40)),
  level: optional(enums(Object.values(StudyLevel))),
  institution: optional(enums(Object.values(Institution))),
});

export default defineEventHandler(async (event) => {
  const id = await getRouterParam(event, "id");
  const data = await readValidatedBody(event, body);
  return await study.updateOption(id, data);
});
