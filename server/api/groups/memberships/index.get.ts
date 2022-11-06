import { defineEventHandler } from "h3";
import prisma from "~/server/database/client";

export default defineEventHandler(async () => {
  return await prisma.group.findMany();
});
