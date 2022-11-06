import { MaterialType } from "@prisma/client";

import { materialType } from "~~/logic";

export default defineEventHandler<MaterialType[]>(async () => {
  return await materialType.getAll();
});
