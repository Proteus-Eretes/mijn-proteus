/**
 * Api errors.
 * These error objects are expected to be returned by the server, even in case of a fault.
 */
export interface ApiError<T extends ErrorCode> {
  _apierr: true;
  code: T;
  context: ErrorContext[T];
}

/**
 * Create an api error which can be thrown.
 * @param code The code of the error to create.
 * @param context Optional additional context for this error, content depends on the code.
 * @returns An api error which can be thrown to indicate a fault.
 */
export function apiError<T extends ErrorCode>(
  code: T,
  context: ErrorContext[T],
): ApiError<T> {
  return {
    _apierr: true,
    code,
    context,
  };
}

/**
 * Validates that a received error is an API error.
 * @param err The error to check.
 * @returns Whether or not the error is an api error.
 */
export function isApiError<T extends ErrorCode = ErrorCode>(
  err: unknown,
  type: T | undefined = undefined,
): err is ApiError<T> {
  if (!(err && typeof err === "object" && "_apierr" in err)) {
    return false;
  }

  if (type === undefined) {
    return true;
  }

  const apiErr = err as unknown as ApiError<ErrorCode>;
  return apiErr.code === type;
}

/**
 * All valid errors which can be created.
 * Keep these errors generic, they should be re-usable at multiple routes.
 * Don't forget to declare the context type and status code below.
 */
export enum ErrorCode {
  // The resource it tries to create already exists.
  Exists = "Exists",
  // Request data validation failed.
  ValidationFailed = "ValidationFailed",
  // A requested resource was not found.
  NotFound = "NotFound",
  // An unexpected internal error occured.
  InternalError = "InternalError",
}

/**
 * HTTP status codes which should be returned with every error.
 */
export const errorStatus: Record<ErrorCode, number> = {
  [ErrorCode.Exists]: 400,
  [ErrorCode.ValidationFailed]: 400,
  [ErrorCode.NotFound]: 404,
  [ErrorCode.InternalError]: 500,
};

/**
 * Types of error contexts.
 * With a context you can send additional data back to the user to better process the errors.
 */
export type ErrorContext = {
  [ErrorCode.Exists]: ExistsErrorContext;
  [ErrorCode.ValidationFailed]: ValidationErrorContext;
  [ErrorCode.NotFound]: string;
  [ErrorCode.InternalError]: string | undefined;
};

/**
 * Exists error context.
 */
interface ExistsErrorContext {
  message: string;
  field?: string;
}

/**
 * Validation error context.
 */
interface ValidationErrorContext {
  message: string;
  key: string;
  got: string;
  expected: string;
  refinement?: string;
}
