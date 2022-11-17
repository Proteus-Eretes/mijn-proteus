import { FetchError } from "ohmyfetch";

import { toApiError } from "./toApiError";
import { ApiError, ErrorCode } from "~~/server/error";
import { apiError } from "~~/server/utils";

export async function sendApiReq<T>(
  url: string,
  method: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any,
): Promise<ApiResponse<T>> {
  try {
    const data: T = await $fetch(url, { method, body });

    return {
      data,
    };
  } catch (e) {
    let error;

    if (e instanceof FetchError) {
      error = toApiError(e) || undefined;
    } else {
      error = apiError(ErrorCode.InternalError, undefined);
    }

    return { error };
  }
}

export interface ApiResponse<T> {
  data?: T;
  error?: ApiError<ErrorCode>;
}
