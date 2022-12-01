/**
 * Lazily request data from the api.
 * @param url The URL to request.
 * @param errorHandler The error handler for this request.
 * @param options Any other options.
 * @returns An api response.
 */
export const useLazyApiFetch: typeof useApiFetch = (
  url,
  errorHandler,
  options,
) =>
  useApiFetch(url, errorHandler, {
    lazy: true,
    ...options,
  });
