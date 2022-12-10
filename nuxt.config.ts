export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "nuxt-icon", "@sidebase/nuxt-auth"],
  typescript: {
    strict: true,
  },
  runtimeConfig: {
    seed: false,
    authentik: {
      host: "https://authentik",
      apiKey: "",
      auth: {
        secret: "",
        clientId: "",
        clientSecret: "",
        issuer: "https://authentik/application/o/mijnpe",
      },
    },
  },
  auth: {
    origin: process.env.AUTH_ORIGIN ?? "http://localhost:3000",
  },
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "D.S.R. Proteus-Eretes",
      meta: [
        {
          name: "description",
          content:
            "Proteus-Eretes is een studentenroeivereniging met meer dan 900 leden, waaronder Olympiërs, WK-gangers, maar ook vele enthousiaste technische studenten!",
        },
        { name: "theme-color", content: "#4285f4" },
      ],
      link: [{ rel: "icon", href: "/favicon.png" }],
    },
  },
});
