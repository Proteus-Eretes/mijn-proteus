import { prisma } from "~/server/prisma/client";

export default defineEventHandler(async () => {
  await prisma.$queryRaw`SELECT 1`;
  return {
    status: "up",
  };
});
