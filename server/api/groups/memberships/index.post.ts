import { membership } from "~/server/logic";
import { MembershipCreate } from "~/server/validation";
import { readValidatedBody } from "~/server/utils";

export default defineEventHandler(async (event) => {
  const data = await readValidatedBody(event, MembershipCreate);
  return await membership.create(data);
});
