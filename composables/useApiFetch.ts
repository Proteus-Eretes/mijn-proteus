/**
 * Request data from the api.
 * @param url The URL to request.
 * @param errorHandler The error handler for this request.
 * @param options Any other options.
 * @returns An api response.
 */
export const useApiFetch: typeof useApiRequest = (url, errorHandler, options) =>
  useApiRequest(url, errorHandler, {
    immidiate: true,
    ...options,
  });
