import { prisma } from "~/server/prisma/client";
import { apiError } from "~/server/utils";
import { ErrorCode } from "~/server/error";

export default defineEventHandler(async () => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return {
      status: "up",
    };
  } catch (e) {
    throw apiError(ErrorCode.InternalError, "Error trying to access database");
  }
});
