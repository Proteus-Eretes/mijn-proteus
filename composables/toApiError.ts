import type { FetchError } from "ohmyfetch";

import { ApiError, ErrorCode } from "~~/server/error";
import { apiError } from "~~/server/utils";

export const toApiError = (
  err: FetchError | null,
): ApiError<ErrorCode> | null => {
  if (err == null) {
    return null;
  }

  if (!err.data || !("data" in err.data) || !("_apierr" in err.data.data)) {
    return apiError(ErrorCode.InternalError, undefined);
  }

  return err.data.data;
};
