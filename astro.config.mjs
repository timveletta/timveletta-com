import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/static";
import react from "@astrojs/react";

export default defineConfig({
  site: "https://timveletta.com",
  integrations: [react(), mdx(), sitemap(), tailwind()],
  output: "static",
  adapter: vercel(),
});
