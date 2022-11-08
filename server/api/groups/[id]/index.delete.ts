import { defineEventHandler, getRouterParam } from "h3";
import { group } from "~/server/logic";

export default defineEventHandler(async (event) => {
  const id = await getRouterParam(event, "id");
  return group.remove(id);
});
