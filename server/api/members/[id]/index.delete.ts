import { getValidatedRouterParam } from "~~/server/utils";
import { member } from "~/server/logic";
import { uuid } from "~~/server/validation";

export default defineEventHandler(async (event) => {
  const id = await getValidatedRouterParam(event, "id", uuid());
  return await member.remove(id);
});
