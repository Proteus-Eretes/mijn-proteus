import prisma from "~/server/database/client";
import { makeError } from "~/server/helpers/error";

export default defineEventHandler(async () => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return {
      status: "up",
    };
  } catch (e) {
    throw makeError(503, e);
  }
});
