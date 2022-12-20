import { apiError, ErrorCode } from "~/utils/error";
import { getValidatedRouterParam, readValidatedBody } from "~/server/utils";
import { StudyUpdate, uuid } from "~~/server/validation";
import { study } from "~/server/logic";

export default defineEventHandler(async (event) => {
  const id = await getValidatedRouterParam(event, "id", uuid());
  const data = await readValidatedBody(event, StudyUpdate);
  const response = await study.update(id, data);

  if (!response) {
    throw apiError(ErrorCode.NotFound, "Study not found");
  }
  return response;
});
