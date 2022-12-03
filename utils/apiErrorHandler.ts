import { ApiError, ErrorCode, isApiError } from "~~/utils/error";

/**
 * Helper to be able to match on different types of API errors.
 * This function throws when there are no handlers compatible with this error.
 * @param handlers A list of possible handles.
 * @returns the resulting errors, which can be used in the component to display the error.
 */
export function apiErrorHandler<R>(
  handlers: (
    | ErrorHandlerEntry<ErrorCode, R | false>
    | ErrorHandler<ErrorCode, R | false>
  )[],
): ErrorHandler<ErrorCode, R> {
  return (err) => {
    for (const handler of handlers) {
      if (typeof handler === "function") {
        const result = handler(err);
        if (result === false) {
          continue;
        } else {
          return result;
        }
      }

      if (!isApiError(err, handler.code)) {
        continue;
      }

      const result = handler.handler(err);
      if (result === false) {
        continue;
      } else {
        return result;
      }
    }

    throw err;
  };
}

/**
 * Create a specific error handler for the function above.
 * Handlers should return nothing if the error was matched & handles, or false if other handlers should be tried.
 * @param code The error code to match on.
 * @param handler Handler for the error code.
 * @returns The handler to use.
 */
export function errHandler<T extends ErrorCode, R>(
  code: T,
  handler: ErrorHandler<T, R>,
): ErrorHandlerEntry<ErrorCode, R | false> {
  return {
    code,
    handler: handler as unknown as ErrorHandler<ErrorCode, R>,
  };
}

export type ErrorHandlerEntry<T extends ErrorCode, R> = {
  code: T;
  handler: ErrorHandler<T, R>;
};

export type ErrorHandler<T extends ErrorCode, R> = (err: ApiError<T>) => R;
