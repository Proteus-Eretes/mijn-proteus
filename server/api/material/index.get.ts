import { Material } from "@prisma/client";

import { material } from "~~/logic";

export default defineEventHandler<Material[]>(async () => {
  return await material.getAll();
});
