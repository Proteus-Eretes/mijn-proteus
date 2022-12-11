import { FetchError } from "ohmyfetch";

import type { Ref } from "vue";
import type { RouterMethod } from "h3";
import type { NitroFetchRequest, TypedInternalResponse } from "nitropack";

import { apiError, ErrorCode, isApiError } from "~~/utils/error";
import type { ErrorHandler } from "~~/utils/apiErrorHandler";

/**
 * Send a request to the api.
 * This is the counterpart to `useFetch`, which is used to retreive data from the api, this can be used to send post requests.
 * The request is not send at loading, so requires you to call `send()`.
 * Provided data can just be the ref's to the data, the contents is retreived just before the request is send.
 * @param url The URL to request.
 * @param errorHandler The error handler for this request.
 * @param options Any other options.
 * @returns An api response.
 */
export function useRequest<
  T extends TypedInternalResponse<R>,
  R extends NitroFetchRequest = NitroFetchRequest,
  E = unknown,
>(
  url: R,
  errorHandler: ErrorHandler<ErrorCode, E>,
  options?: ApiRequestOptions,
): ApiResponse<T, R, E> {
  const data: Ref<T | null> = ref(null);
  const error: Ref<E | null> = ref(null);
  const requesting: Ref<boolean> = ref(false);

  const handleError = (e: unknown) => {
    const err = (e as FetchError).data?.data;

    if (isApiError(err)) {
      error.value = errorHandler(err);
    } else {
      error.value = errorHandler(apiError(ErrorCode.InternalError, undefined));
    }
  };

  const makeBody = () => {
    if (!options?.body) {
      return null;
    }

    const body: Record<string, unknown> = {};
    for (const k of Object.keys(options.body)) {
      body[k] = options.body[k].value;
    }

    return body;
  };

  const send = async () => {
    error.value = null;
    requesting.value = true;

    try {
      const res = await $fetch<T>(url, {
        method: options?.method,
        body: makeBody(),
      });

      if (options?.body) {
        for (const k of Object.keys(options.body)) {
          options.body[k].value = null;
        }
      }

      data.value = res;
      options?.onSuccess?.();
    } catch (e) {
      handleError(e);
    } finally {
      requesting.value = false;
    }
  };

  return { data, error, requesting, send };
}

export interface ApiRequestOptions {
  method?: RouterMethod;
  body?: Record<string, Ref<unknown>>;
  onSuccess?: () => void;
}

export interface ApiResponse<T, R extends NitroFetchRequest, E> {
  data: Ref<TypedInternalResponse<R, T> | null>;
  error: Ref<E | null>;
  requesting: Ref<boolean>;
  send: () => void;
}
