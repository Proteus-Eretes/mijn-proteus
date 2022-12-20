import { apiError, ErrorCode } from "~/utils/error";
import { getValidatedRouterParam, readValidatedBody } from "~/server/utils";
import { MembershipUpdate, uuid } from "~~/server/validation";
import { membership } from "~/server/logic";

export default defineEventHandler(async (event) => {
  const id = await getValidatedRouterParam(event, "id", uuid());
  const data = await readValidatedBody(event, MembershipUpdate);
  const response = await membership.update(id, data);

  if (!response) {
    throw apiError(ErrorCode.NotFound, "Membership not found");
  }
  return response;
});
