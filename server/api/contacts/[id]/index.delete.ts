import { defineEventHandler, getRouterParam } from "h3";
import { contact } from "~/server/logic";

export default defineEventHandler(async (event) => {
  const id = await getRouterParam(event, "id");
  return await contact.remove(id);
});
