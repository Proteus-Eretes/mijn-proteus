import { study } from "~/server/logic";

export default defineEventHandler(async () => {
  return await study.option.getAll();
});
