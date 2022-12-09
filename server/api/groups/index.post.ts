import { group } from "~/server/logic";
import { GroupCreateValidator } from "~/server/validation";
import { readValidatedBody } from "~/server/utils";

export default defineEventHandler(async (event) => {
  const data = await readValidatedBody(event, GroupCreateValidator);

  return await group.create(data);
});
