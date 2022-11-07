import { MaterialType } from "@prisma/client";

import { materialType } from "~~/server/logic";

export default defineEventHandler<MaterialType[]>(async () => {
  return await materialType.getAll();
});
