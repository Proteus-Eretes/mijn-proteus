import { apiError, ErrorCode } from "~/utils/error";
import { getValidatedRouterParam, readValidatedBody } from "~/server/utils";
import { StudyMemberUpdate, uuid } from "~~/server/validation";
import { study } from "~/server/logic";

export default defineEventHandler(async (event) => {
  const id = await getValidatedRouterParam(event, "id", uuid());
  const data = await readValidatedBody(event, StudyMemberUpdate);
  const response = await study.member.update(id, data);

  if (!response) {
    throw apiError(ErrorCode.NotFound, "MemberStudy not found");
  }
  return response;
});
