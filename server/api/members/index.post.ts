import { member } from "~/server/logic";
import { MemberCreate } from "~~/server/validation";
import { readValidatedBody } from "~/server/utils";

export default defineEventHandler(async (event) => {
  const data = await readValidatedBody(event, MemberCreate);
  return await member.create(data);
});
