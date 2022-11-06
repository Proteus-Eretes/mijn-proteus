import { defineEventHandler, getRouterParam } from "h3";
import prisma from "~/server/database/client";

export default defineEventHandler(async (event) => {
  const id = await getRouterParam(event, "id");
  return await prisma.group.delete({
    where: { id },
  });
});
