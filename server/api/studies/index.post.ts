import { readValidatedBody } from "~/server/utils";
import { study } from "~/server/logic";
import { StudyMemberCreate } from "~/server/validation";

export default defineEventHandler(async (event) => {
  const data = await readValidatedBody(event, StudyMemberCreate);
  return await study.member.create(data);
});
