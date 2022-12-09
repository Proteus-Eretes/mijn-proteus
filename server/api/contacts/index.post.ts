import { contact } from "~/server/logic";
import { ContactCreateValidator } from "~~/server/validation";
import { readValidatedBody } from "~/server/utils";

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, ContactCreateValidator);

  return await contact.create(body);
});
