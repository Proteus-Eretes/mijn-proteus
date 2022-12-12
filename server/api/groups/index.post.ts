import { group } from "~/server/logic";
import { GroupCreate } from "~/server/validation";
import { readValidatedBody } from "~/server/utils";

export default defineEventHandler(async (event) => {
  const data = await readValidatedBody(event, GroupCreate);

  return await group.create(data);
});
