import { defineEventHandler } from "h3";
import { group } from "~/server/logic";

export default defineEventHandler(async () => {
  return await group.getAll();
});
