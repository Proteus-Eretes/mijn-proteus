import { readValidatedBody } from "~/server/utils";
import { study } from "~/server/logic";
import { StudyCreate } from "~~/server/validation";

export default defineEventHandler(async (event) => {
  const data = await readValidatedBody(event, StudyCreate);
  return await study.create(data);
});
