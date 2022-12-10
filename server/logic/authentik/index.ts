export * as user from "./user";

/**
 * Fetch helper to send requests to the Authenik server.
 * @param path The path to use with the request.
 * @param init Additional request options.
 * @returns The fetch response object.
 */
export const authentikFetch = (path: string, init?: RequestInit) => {
  const config = useRuntimeConfig();

  return fetch(`${config.authentik.host}/api/v3${path}`, {
    headers: {
      "Authorization": `Bearer ${config.authentik.apiKey}`,
      "Accept": "application/json",
      "Content-Type": "application/json",
      ...init?.headers,
    },
    ...init,
  });
};
