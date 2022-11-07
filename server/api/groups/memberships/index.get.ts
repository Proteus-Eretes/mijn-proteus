import { defineEventHandler } from "h3";
import prisma from "~/server/prisma/client";

export default defineEventHandler(async () => {
  return await prisma.membership.findMany();
});
