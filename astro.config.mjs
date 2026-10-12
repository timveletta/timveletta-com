import cloudflare from "@astrojs/cloudflare";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import { d1, r2 } from "@emdash-cms/cloudflare";
import { defineConfig } from "astro/config";
import emdash from "emdash/astro";
import autoprefixer from "autoprefixer";
import postcss from "postcss";
import tailwindcss from "tailwindcss";

const legacyBlogRedirects = {
  "/blog/2020-07-14-accessing-react-state-in-your-component-cleanup-with-hooks":
    "/blog/accessing-react-state-in-your-component-cleanup-with-hooks",
  "/blog/2020-12-08-direct-lambda-resolvers-with-aws-amplify":
    "/blog/direct-lambda-resolvers-with-aws-amplify",
  "/blog/2020-07-16-refreshing-my-blog-with-netlify-cms-and-tailwind-css":
    "/blog/refreshing-my-blog-with-netlify-cms-and-tailwind-css",
  "/blog/2020-08-14-updated-deploying-a-static-site-to-aws-using-github-actions":
    "/blog/updated-deploying-a-static-site-to-aws-using-github-actions",
  "/blog/2020-07-08-deploying-a-static-site-to-aws-using-github-actions":
    "/blog/deploying-a-static-site-to-aws-using-github-actions",
};

// Tailwind runs only on this site's stylesheets. A global PostCSS config also
// processes EmDash admin CSS, which uses @layer without @tailwind directives.
const tailwindProcessor = postcss([tailwindcss(), autoprefixer()]);

function tailwindSourcePlugin() {
  return {
    name: "tailwind-source-only",
    enforce: "pre",
    async transform(code, id) {
      const filename = id.split("?")[0];
      if (!filename.includes("/src/") || !filename.endsWith(".css")) return null;
      if (!code.includes("@tailwind") && !code.includes("@apply")) return null;
      const result = await tailwindProcessor.process(code, { from: filename });
      return { code: result.css, map: result.map };
    },
  };
}

export default defineConfig({
  site: "https://timveletta.com",
  output: "server",
  trailingSlash: "ignore",
  adapter: cloudflare(),
  redirects: legacyBlogRedirects,
  vite: {
    plugins: [tailwindSourcePlugin()],
  },
  integrations: [
    react(),
    mdx(),
    emdash({
      database: d1({ binding: "DB", session: "auto" }),
      storage: r2({ binding: "MEDIA" }),
    }),
  ],
});
