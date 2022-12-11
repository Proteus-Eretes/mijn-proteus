import { material } from "~~/server/logic";
import { MaterialTypeCreate } from "~~/server/validation";
import { readValidatedBody } from "~~/server/utils";

export default defineEventHandler(async (e) => {
  const body = await readValidatedBody(e, MaterialTypeCreate);

  return await material.type.create(body);
});
