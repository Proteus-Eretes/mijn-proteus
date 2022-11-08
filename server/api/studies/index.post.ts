import { defineEventHandler } from "h3";
import { date, object, optional, size, string } from "superstruct";
import { readValidatedBody } from "~/server/utils";
import { study } from "~/server/logic";
import { uuid } from "~/server/validation";

const body = object({
  studyNumber: optional(size(string(), 1, 40)),
  startDate: date(),
  stopDate: date(),
  memberId: uuid(),
  studyId: uuid(),
});

export default defineEventHandler(async (event) => {
  const data = await readValidatedBody(event, body);
  return await study.create(data);
});
