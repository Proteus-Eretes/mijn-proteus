import { getValidatedRouterParam, readValidatedBody } from "~/server/utils";
import { MemberUpdate, uuid } from "~~/server/validation";
import { member } from "~/server/logic";

export default defineEventHandler(async (event) => {
  const id = await getValidatedRouterParam(event, "id", uuid());
  const data = await readValidatedBody(event, MemberUpdate);

  return await member.update(id, data);
});
