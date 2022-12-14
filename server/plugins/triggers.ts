import { apiError, ErrorCode } from "~/utils/error";
import { addTriggers } from "~/server/prisma";

import { h3Error } from "./apiError";

/**
 * Makes sure that the triggers script has run correctly before accepting requests on release.
 */
export default defineNitroPlugin(async (nitroApp) => {
  const promise = addTriggers();

  if (process.env.NODE_ENV !== "development") {
    const oldHandler = nitroApp.h3App.handler;
    nitroApp.h3App.handler = defineEventHandler(() => {
      throw h3Error(
        apiError(ErrorCode.InternalError, "Constraints not ready."),
      );
    });

    await promise;
    nitroApp.h3App.handler = oldHandler;
  } else {
    await promise;
  }
});
