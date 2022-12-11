import { material } from "~~/server/logic";
import { MaterialCreate } from "~~/server/validation";
import { readValidatedBody } from "~~/server/utils";

export default defineEventHandler(async (e) => {
  const body = await readValidatedBody(e, MaterialCreate);

  return await material.create(body);
});
