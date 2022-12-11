import { contact } from "~/server/logic";
import { getValidatedRouterParam } from "~~/server/utils";
import { uuid } from "~~/server/validation";

export default defineEventHandler(async (event) => {
  const id = await getValidatedRouterParam(event, "id", uuid());

  return await contact.remove(id);
});
