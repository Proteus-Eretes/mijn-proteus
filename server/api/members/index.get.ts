import { defineEventHandler } from "h3";
import { member } from "~/server/logic";

export default defineEventHandler(async () => {
  return await member.getAll();
});
