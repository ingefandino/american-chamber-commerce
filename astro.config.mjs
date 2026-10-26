// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));

// https://astro.build/config
export default defineConfig({
  site: "https://americanchamberofcommerce.us",
  integrations: [
    sitemap({
      filter: (page) => page !== "https://americanchamberofcommerce.us/",
      i18n: {
        defaultLocale: "en",
        locales: {
          en: "en-US",
          es: "es-US",
        },
      },
    }),
  ],
  image: {
    service: {
      entrypoint: "astro/assets/services/sharp",
    },
  },
  build: {
    inlineStylesheets: "auto",
  },
  vite: {
    resolve: {
      alias: {
        "@assets": `${root}src/assets`,
        "@components": `${root}src/components`,
        "@data": `${root}src/data`,
        "@layouts": `${root}src/layouts`,
        "@lib": `${root}src/lib`,
        "@styles": `${root}src/styles`,
      },
    },
  },
});
