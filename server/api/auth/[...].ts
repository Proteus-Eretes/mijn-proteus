import { EventHandler } from "h3";

import AuthentikProvider from "next-auth/providers/authentik";

import { NuxtAuthHandler } from "#auth";

let handler: EventHandler;

export default defineEventHandler((e) => {
  if (!handler) {
    const config = useRuntimeConfig();

    handler = NuxtAuthHandler({
      secret: config.auth.secret,
      providers: [
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore Import is exported on .default during SSR, so we need to call it this way. May be fixed via Vite at some point
        AuthentikProvider.default({
          clientId: config.auth.clientId,
          clientSecret: config.auth.clientSecret,
          issuer: config.auth.issuer,
        }),
      ],
    });
  }

  return handler(e);
});
