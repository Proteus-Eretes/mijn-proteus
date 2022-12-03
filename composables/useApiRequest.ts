import type { Ref } from "vue";
import type { RouterMethod } from "h3";
import type { FetchError } from "ohmyfetch";

import type { NitroFetchRequest } from "nitropack";

import { apiError, ErrorCode, isApiError } from "~~/utils/error";
import type { ErrorHandler } from "~~/utils/apiErrorHandler";

/**
 * Request data from the api.
 * This is not done immidiately, so this is useful when you require user input before sending the request.
 * @param url The URL to request.
 * @param errorHandler The error handler for this request.
 * @param options Any other options.
 * @returns An api response.
 */
export async function useApiRequest<
  T = void,
  R extends NitroFetchRequest = NitroFetchRequest,
  E = unknown,
>(
  url: R,
  errorHandler: ErrorHandler<ErrorCode, E>,
  options?: ApiRequestOptions,
): Promise<ApiResponse<T, R, E>> {
  const hasRequested = ref(false);

  const {
    data,
    error: fetchErr,
    pending: fetchPending,
    execute,
  } = await useFetch<T, FetchError, R>(url, {
    method: options?.method,
    onResponse: options?.onSuccess,
    body: Object.keys(options?.body || {}).reduce<Record<string, unknown>>(
      (res, k) => {
        res[k] = options?.body?.[k].value;
        return res;
      },
      {},
    ),
  });

  const error = computed(() => {
    if (!fetchErr.value) {
      return null;
    }

    const apiErr = fetchErr.value?.data?.data;
    if (isApiError(apiErr)) {
      return errorHandler(apiErr);
    } else {
      return errorHandler(apiError(ErrorCode.InternalError, undefined));
    }
  });

  const pending = computed(() => {
    if (!hasRequested.value) {
      return options?.initiallyPending || false;
    }

    return fetchPending.value;
  });

  return { data, error, pending, execute };
}

export interface ApiRequestOptions {
  method?: RouterMethod;
  body?: Record<string, Ref<unknown>>;
  lazy?: boolean;
  immidiate?: boolean;
  initiallyPending?: boolean;
  onSuccess?: () => void;
}

export interface ApiResponse<T, R extends NitroFetchRequest, E> {
  data: ReturnType<typeof useFetch<T, E, R>>["data"];
  error: Ref<E | null>;
  pending: Ref<boolean>;
  execute: () => void;
}
