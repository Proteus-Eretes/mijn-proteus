import { Material } from "@prisma/client";

import { material } from "~~/server/logic";

export default defineEventHandler<Material[]>(async () => {
  return await material.getAll();
});
