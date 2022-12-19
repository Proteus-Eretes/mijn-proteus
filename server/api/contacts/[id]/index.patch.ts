import { apiError, ErrorCode } from "~/utils/error";
import { ContactUpdateImplicit, uuid } from "~~/server/validation";
import { getValidatedRouterParam, readValidatedBody } from "~/server/utils";
import { contact } from "~/server/logic";

export default defineEventHandler(async (event) => {
  const id = await getValidatedRouterParam(event, "id", uuid());
  const body = await readValidatedBody(event, ContactUpdateImplicit);
  const response = await contact.update(id, body);

  return response ?? apiError(ErrorCode.NotFound, "Contact not found");
});
