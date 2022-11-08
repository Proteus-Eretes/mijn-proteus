import { defineEventHandler, getRouterParam } from "h3";
import {
  boolean,
  date,
  enums,
  object,
  optional,
  size,
  string,
} from "superstruct";
import { GroupType } from "@prisma/client";
import { readValidatedBody } from "~/server/utils";
import { group } from "~/server/logic";
import { uuid } from "~/server/validation";

const body = object({
  name: size(string(), 2, 50),
  description: size(string(), 2, 120),
  isActive: boolean(),
  startDate: date(),
  lastActive: date(),
  type: enums(Object.values(GroupType)),
  parentId: optional(uuid()),
});

export default defineEventHandler(async (event) => {
  const id = await getRouterParam(event, "id");
  const data = await readValidatedBody(event, body);
  return await group.update(id, data);
});
