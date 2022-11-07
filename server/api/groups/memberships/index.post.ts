import { defineEventHandler, readBody } from "h3";
import { Prisma } from "@prisma/client";
import prisma from "~/server/prisma/client";

export default defineEventHandler(async (event) => {
  const data = await readBody<Prisma.MembershipCreateInput>(event);
  return await prisma.membership.create({
    data,
  });
});
