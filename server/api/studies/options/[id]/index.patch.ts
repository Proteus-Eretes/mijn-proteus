import { getValidatedRouterParam, readValidatedBody } from "~/server/utils";
import { StudyUpdate, uuid } from "~~/server/validation";
import { study } from "~/server/logic";

export default defineEventHandler(async (event) => {
  const id = await getValidatedRouterParam(event, "id", uuid());
  const data = await readValidatedBody(event, StudyUpdate);

  return await study.update(id, data);
});
