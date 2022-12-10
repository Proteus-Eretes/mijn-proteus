export default defineNuxtConfig({
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
  modules: ["@nuxtjs/tailwindcss", "nuxt-icon", "nuxt-meilisearch"],
  meilisearch: {
    instantSearch: {
      theme: "satellite",
    },
    adminApiKey: "MASTER_KEY",
    searchApiKey: "MASTER_KEY",
    hostUrl: "http://localhost:7700",
    serverSideUsage: true,
  },
  typescript: {
    strict: true,
  },
});
