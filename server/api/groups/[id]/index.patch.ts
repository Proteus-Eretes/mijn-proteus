import { getValidatedRouterParam, readValidatedBody } from "~/server/utils";
import { GroupUpdate, uuid } from "~~/server/validation";
import { group } from "~/server/logic";

export default defineEventHandler(async (event) => {
  const id = await getValidatedRouterParam(event, "id", uuid());
  const data = await readValidatedBody(event, GroupUpdate);

  return await group.update(id, data);
});
