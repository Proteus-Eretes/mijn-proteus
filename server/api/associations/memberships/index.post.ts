import { defineEventHandler, readBody } from "h3";
import { Prisma } from "@prisma/client";
import prisma from "~/server/database/client";

export default defineEventHandler(async (event) => {
  const body = await readBody<Prisma.AssociationMembershipCreateInput>(event);
  return await prisma.associationMembership.create({
    data: body,
  });
});
