import { apiError, ErrorCode } from "~/utils/error";
import { getValidatedRouterParam } from "~~/server/utils";
import { group } from "~/server/logic";
import { uuid } from "~~/server/validation";

export default defineEventHandler(async (event) => {
  const id = await getValidatedRouterParam(event, "id", uuid());
  const response = await group.get(id);

  if (!response) {
    throw apiError(ErrorCode.NotFound, "Group not found");
  }
  return response;
});
