import { defineEventHandler, readBody } from "h3";
import { Prisma } from "@prisma/client";
import prisma from "~/server/database/client";

export default defineEventHandler(async (event) => {
  const data = await readBody<Prisma.GroupMembershipCreateInput>(event);
  return await prisma.groupMembership.create({
    data,
  });
});
