import { defineEventHandler, getRouterParam, readBody } from "h3";
import { Prisma } from "@prisma/client";
import { prisma } from "~/server/prisma/client";

export default defineEventHandler(async (event) => {
  const id = await getRouterParam(event, "id");
  const data = await readBody<Prisma.MemberUpdateInput>(event);
  return await prisma.member.update({
    where: { id },
    data,
  });
});
