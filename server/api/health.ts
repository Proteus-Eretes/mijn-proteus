import { makeError } from "../logic";
import { prisma } from "~/server/prisma/client";

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
