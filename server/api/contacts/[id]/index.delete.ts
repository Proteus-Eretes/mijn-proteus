import { contact } from "~/server/logic";
import { getValidatedRouterParam } from "~~/server/utils";
import { uuid } from "~~/server/validation/utils";

export default defineEventHandler(async (event) => {
  const id = await getValidatedRouterParam(event, "id", uuid());
  return await contact.remove(id);
});
