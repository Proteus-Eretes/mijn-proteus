import { apiError, ErrorCode } from "~/utils/error";
import { getValidatedRouterParam } from "~~/server/utils";
import { study } from "~/server/logic";
import { uuid } from "~~/server/validation";

export default defineEventHandler(async (event) => {
  const id = await getValidatedRouterParam(event, "id", uuid());
  const response = await study.remove(id);

  if (!response) {
    throw apiError(ErrorCode.NotFound, "Study not found");
  }
  return response;
});
