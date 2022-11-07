import { defineEventHandler, getRouterParam, readBody } from "h3";
import { Prisma } from "@prisma/client";
import { prisma } from "~/server/prisma/client";

export default defineEventHandler(async (event) => {
  const id = await getRouterParam(event, "id");
  const data = await readBody<Prisma.ContactUpdateInput>(event);
  return await prisma.contact.update({
    where: { id },
    data,
  });
});
