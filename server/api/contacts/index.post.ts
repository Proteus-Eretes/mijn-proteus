import { contact } from "~/server/logic";
import { ContactCreate } from "~~/server/validation";
import { readValidatedBody } from "~/server/utils";

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, ContactCreate);

  return await contact.create(body);
});
