import { apiError, ErrorCode } from "~/utils/error";
import { getValidatedRouterParam, readValidatedBody } from "~/server/utils";
import { GroupUpdate, uuid } from "~~/server/validation";
import { group } from "~/server/logic";

export default defineEventHandler(async (event) => {
  const id = await getValidatedRouterParam(event, "id", uuid());
  const data = await readValidatedBody(event, GroupUpdate);
  const response = await group.update(id, data);

  if (!response) {
    throw apiError(ErrorCode.NotFound, "Group not found");
  }
  return response;
});
