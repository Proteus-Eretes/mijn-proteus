import { member } from "~/server/logic";
import { readValidatedBody } from "~/server/utils";
import { MemberCreateValidator } from "~~/server/validation/member";

export default defineEventHandler(async (event) => {
  const data = await readValidatedBody(event, MemberCreateValidator);
  return await member.create(data);
});
