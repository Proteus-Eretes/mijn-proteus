import { defineEventHandler } from "h3";
import { study } from "~/server/logic";

export default defineEventHandler(async () => {
  return await study.getAllOptions();
});
