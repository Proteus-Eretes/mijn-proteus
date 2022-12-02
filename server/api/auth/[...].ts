import { EventHandler } from "h3";

import { NuxtAuthHandler } from "#auth";

let handler: EventHandler;

export default defineEventHandler((e) => {
  if (!handler) {
    const config = useRuntimeConfig();

    handler = NuxtAuthHandler({
      secret: config.authentik.auth.secret,
      providers: [
        {
          id: "proteus",
          name: "Proteus Login",
          type: "oauth",
          wellKnown: `${config.authentik.auth.issuer}/.well-known/openid-configuration`,
          clientId: config.authentik.auth.clientId,
          clientSecret: config.authentik.auth.clientSecret,
          authorization: { params: { scope: "openid email profile proteus" } },
          checks: ["pkce", "state"],
          profile(profile) {
            return {
              id: profile.sub,
              name: profile.name ?? profile.preferred_username,
              email: profile.email,
              image: profile.picture,
            };
          },
        },
      ],
    });
  }

  return handler(e);
});
