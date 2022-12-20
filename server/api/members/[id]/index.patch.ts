import { apiError, ErrorCode } from "~/utils/error";
import { getValidatedRouterParam, readValidatedBody } from "~/server/utils";
import { MemberUpdate, uuid } from "~~/server/validation";
import { member } from "~/server/logic";

export default defineEventHandler(async (event) => {
  const id = await getValidatedRouterParam(event, "id", uuid());
  const data = await readValidatedBody(event, MemberUpdate);
  const response = await member.update(id, data);

  if (!response) {
    throw apiError(ErrorCode.NotFound, "Member not found");
  }
  return response;
});
