/**
 * Lazily request data from the api.
 * This is not done immidiately, so this is useful when you require user input before sending the request.
 * @param url The URL to request.
 * @param errorHandler The error handler for this request.
 * @param options Any other options.
 * @returns An api response.
 */
export const useLazyApiRequest: typeof useApiRequest = (
  url,
  errorHandler,
  options,
) =>
  useApiRequest(url, errorHandler, {
    lazy: true,
    ...options,
  });
