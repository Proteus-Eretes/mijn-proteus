import type { Ref } from "vue";
import type { FetchError } from "ohmyfetch";

import { toApiError } from "./toApiError";
import { ApiError, ErrorCode } from "~~/server/error";

/**
 * Converts a fetch error from fetch hooks into an api error with typings.
 * This function doesn't do extensive validation for performance.
 * @param err A reference to a possible fetch error.
 * @returns A reference to the API error.
 */
export const useApiError = (
  err: Ref<FetchError | null>,
): Ref<ApiError<ErrorCode> | null> => computed(() => toApiError(err.value));
