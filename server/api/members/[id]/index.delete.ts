import { apiError, ErrorCode } from "~/utils/error";
import { getValidatedRouterParam } from "~~/server/utils";
import { member } from "~/server/logic";
import { uuid } from "~~/server/validation";

export default defineEventHandler(async (event) => {
  const id = await getValidatedRouterParam(event, "id", uuid());
  const response = await member.remove(id);

  if (!response) {
    throw apiError(ErrorCode.NotFound, "Member not found");
  }
  return response;
});
