import { enums, object, size, string } from "superstruct";
import { Institution, StudyLevel } from "@prisma/client";
import { study } from "~/server/logic";
import { readValidatedBody } from "~/server/utils";

const body = object({
  name: size(string(), 2, 40),
  level: enums(Object.values(StudyLevel)),
  institution: enums(Object.values(Institution)),
});

export default defineEventHandler(async (event) => {
  const data = await readValidatedBody(event, body);
  return await study.createOption(data);
});
