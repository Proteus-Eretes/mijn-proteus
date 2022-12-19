import { getValidatedRouterParam, readValidatedBody } from "~/server/utils";
import { StudyUpdate, uuid } from "~~/server/validation";
import { study } from "~/server/logic";

export default defineEventHandler(async (event) => {
  const id = await getValidatedRouterParam(event, "id", uuid());
  const data = await readValidatedBody(event, StudyUpdate);
  const response = await study.update(id, data);

  return response ?? apiError(ErrorCode.NotFound, "Study not found");
});
