import { ContactUpdateImplicitValidator, uuid } from "~~/server/validation";
import { getValidatedRouterParam, readValidatedBody } from "~/server/utils";
import { contact } from "~/server/logic";

export default defineEventHandler(async (event) => {
  const id = await getValidatedRouterParam(event, "id", uuid());
  const body = await readValidatedBody(event, ContactUpdateImplicitValidator);

  return await contact.update({
    id,
    ...body,
  });
});
