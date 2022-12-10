import { prisma } from "~/server/prisma";

export default defineEventHandler(async () => {
  await prisma.$queryRaw`SELECT 1`;
  return {
    status: "up",
  };
});
