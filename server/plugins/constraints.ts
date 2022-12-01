import { h3Error } from "./apiError";

import { ErrorCode, apiError } from "~/utils/error";
import { addConstraints } from "~/server/prisma/constraints";

/**
 * Makes sure that the constraints script has run correctly before accepting requests.
 */
export default defineNitroPlugin(async (nitroApp) => {
  const oldHandler = nitroApp.h3App.handler;
  nitroApp.h3App.handler = defineEventHandler(() => {
    throw h3Error(apiError(ErrorCode.InternalError, "Constraints not ready."));
  });

  await addConstraints();
  nitroApp.h3App.handler = oldHandler;
});
