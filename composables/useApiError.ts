import { Ref } from "vue";
import { FetchError } from "ohmyfetch";

import { ApiError, ErrorCode } from "~~/server/error";
import { apiError } from "~~/server/utils";

/**
 * Converts a fetch error from fetch hooks into an api error with typings.
 * This function doesn't do extensive validation for performance.
 * @param err A reference to a possible fetch error.
 * @returns A reference to the API error.
 */
export const useApiArror = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  err: Ref<FetchError<any> | null>,
): Ref<ApiError<ErrorCode> | null> =>
  computed(() => {
    if (err.value == null) {
      return null;
    }

    if (
      !err.value.data ||
      !("data" in err.value.data) ||
      !("code" in err.value.data.data)
    ) {
      return apiError(ErrorCode.InternalError, undefined);
    }

    return err.value.data.data;
  });
