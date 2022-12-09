import { member } from "~/server/logic";
import { MemberCreateValidator } from "~~/server/validation/member";
import { readValidatedBody } from "~/server/utils";

export default defineEventHandler(async (event) => {
  const data = await readValidatedBody(event, MemberCreateValidator);
  return await member.create(data);
});
