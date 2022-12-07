import { contact } from "~/server/logic";
import { getValidatedRouterParam, readValidatedBody } from "~/server/utils";
import { ContactUpdateImplicitValidator } from "~~/server/validation";
import { uuid } from "~~/server/validation/utils";

export default defineEventHandler(async (event) => {
  const id = await getValidatedRouterParam(event, "id", uuid());
  const body = await readValidatedBody(event, ContactUpdateImplicitValidator);

  return await contact.update({
    id,
    ...body,
  });
});
