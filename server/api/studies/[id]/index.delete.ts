import { defineEventHandler, getRouterParam } from "h3";
import { study } from "~/server/logic";

export default defineEventHandler(async (event) => {
  const id = await getRouterParam(event, "id");
  return await study.remove(id);
});
