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
