import { getValidatedRouterParam, readValidatedBody } from "~/server/utils";
import { member } from "~/server/logic";
import { MemberUpdateValidator, uuid } from "~~/server/validation";

export default defineEventHandler(async (event) => {
  const id = await getValidatedRouterParam(event, "id", uuid());
  const data = await readValidatedBody(event, MemberUpdateValidator);
  return await member.update(id, data);
});
