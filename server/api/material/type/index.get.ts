import { material } from "~~/server/logic";

export default defineEventHandler(async () => {
  return await material.type.getAllWithParent();
});
