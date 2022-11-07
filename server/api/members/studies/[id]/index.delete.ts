import { defineEventHandler, getRouterParam } from "h3";
import { prisma } from "~/server/prisma/client";

export default defineEventHandler(async (event) => {
  const id = await getRouterParam(event, "id");
  return await prisma.memberStudy.delete({
    where: { id },
  });
});
