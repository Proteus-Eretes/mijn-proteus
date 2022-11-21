import { materialType } from "~~/server/logic";

export default defineEventHandler(async () => {
  return await materialType.getAllWithParent();
});
