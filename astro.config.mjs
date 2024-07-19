import { loadEnv } from "vite";
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/static";
import react from "@astrojs/react";
import sanity from "@sanity/astro";

const { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET } = loadEnv(
  import.meta.env.MODE,
  process.cwd(),
  ""
);

const projectId = PUBLIC_SANITY_PROJECT_ID;
const dataset = PUBLIC_SANITY_DATASET;

export default defineConfig({
  site: "https://timveletta.com",
  integrations: [
    react(),
    mdx(),
    sitemap(),
    tailwind(),
    sanity({
      projectId,
      dataset,
      useCdn: false,
      studioBasePath: "/admin",
    }),
  ],
  output: "static",
  adapter: vercel(),
});
