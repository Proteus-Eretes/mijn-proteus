import { defineEventHandler, getRouterParam } from "h3";
import { member } from "~/server/logic";

export default defineEventHandler(async (event) => {
  const id = await getRouterParam(event, "id");
  return await member.remove(id);
});
