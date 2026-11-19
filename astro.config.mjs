import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import { d1, r2 } from "@emdash-cms/cloudflare";
import { defineConfig, fontProviders } from "astro/config";
import emdash from "emdash/astro";

import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  output: "server",
  adapter: cloudflare(),

  redirects: {
    "/posts": "/posts/page/1",
  },

  image: {
    layout: "constrained",
    responsiveStyles: true,
  },

  integrations: [
    react(),
    emdash({
      database: d1({ binding: "DB", session: "auto", coalesce: true }),
      storage: r2({ binding: "MEDIA" }),
    }),
  ],

  fonts: [
    {
      provider: fontProviders.google(),
      name: "Mulish",
      cssVariable: "--font-body",
      weights: [200, 300, 400, 500, 600, 700, 1000],
      fallbacks: ["sans-serif"],
    },
    {
      provider: fontProviders.google(),
      name: "JetBrains Mono",
      cssVariable: "--font-mono",
      weights: [400, 500],
      fallbacks: ["monospace"],
    },
  ],

  devToolbar: { enabled: false },

  vite: {
    plugins: [tailwindcss()],
  },
});
