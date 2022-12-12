import { getValidatedRouterParam, readValidatedBody } from "~/server/utils";
import { MembershipUpdate, uuid } from "~~/server/validation";
import { membership } from "~/server/logic";

export default defineEventHandler(async (event) => {
  const id = await getValidatedRouterParam(event, "id", uuid());
  const data = await readValidatedBody(event, MembershipUpdate);

  return await membership.update(id, data);
});
