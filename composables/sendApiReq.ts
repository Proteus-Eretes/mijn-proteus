import type { FetchError } from "ohmyfetch";

import { toApiError } from "./toApiError";
import { ApiError, ErrorCode } from "~~/server/error";

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
    return { error: toApiError(e as FetchError) || undefined };
  }
}

export interface ApiResponse<T> {
  data?: T;
  error?: ApiError<ErrorCode>;
}
