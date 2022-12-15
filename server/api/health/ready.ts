import { STATUS_CODES } from "http";

import { prisma } from "~/server/prisma";

export default defineEventHandler(async () => {
  const result = await Promise.all([checkDatabase(), checkAuthentik()]);

  if (!result.every((r) => r)) {
    return createError({
      statusCode: 503,
      statusMessage: STATUS_CODES[503],
      data: "Dependencies not healthy.",
      fatal: false,
      stack: undefined,
    });
  }

  return "OK";
});

const checkDatabase = async (): Promise<boolean> => {
  try {
    await prisma.$queryRaw`SELECT 1`;
  } catch {
    return false;
  }

  return true;
};

const checkAuthentik = async (): Promise<boolean> => {
  const config = useRuntimeConfig();

  try {
    await $fetch(`${config.authentik.host}/-/health/ready`);
  } catch (e) {
    return false;
  }

  return true;
};
