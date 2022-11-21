import { ApiError, ErrorCode } from "~~/server/error";

/**
 * Helper to be able to match on different types of API errors.
 * @param handlers A list of possible handles.
 * @returns nothing if a handler matched, otherwise false.
 */
export const apiErrorHandler = (
  handlers: (HandlerEntry | Handler)[],
): Handler<ErrorCode> => {
  return (err) => {
    for (const handler of handlers) {
      if (typeof handler === "function") {
        if (handler(err) === false) {
          continue;
        } else {
          return;
        }
      }

      if (handler.code !== err.code) {
        continue;
      }

      if (handler.handler(err) === false) {
        continue;
      } else {
        return;
      }
    }

    return false;
  };
};

/**
 * Create a specific error handler for the function above.
 * Handlers should return nothing if the error was matched & handles, or false if other handlers should be tried.
 * @param code The error code to match on.
 * @param handler Handler for the error code.
 * @returns The handler to use.
 */
export function errHandler<T extends ErrorCode>(
  code: T,
  handler: Handler<T>,
): HandlerEntry {
  const h = handler as unknown as Handler;

  return {
    code,
    handler: h,
  };
}

type HandlerEntry = {
  code?: ErrorCode;
  handler: Handler<ErrorCode>;
};

type Handler<T extends ErrorCode = ErrorCode> = (
  err: ApiError<T>,
) => false | void;
