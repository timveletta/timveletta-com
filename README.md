# TimVeletta.com

The website of Tim Veletta, built with [Astro](https://astro.build/) and [EmDash](https://emdashcms.com/), Cloudflare's Astro-native CMS. The site runs on Cloudflare Workers. Posts live in D1, uploaded media lives in R2, and the admin is at `/_emdash/admin`.

Projects and TIL notes stay in Astro content collections. Blog posts are seeded from the markdown in `src/content/blog` into `seed/seed.json`.

## Local development

Node.js 22.16 or newer is required.

```bash
npm install
npm run seed:blog
npm run dev
```

Open the site at the printed URL, then open `/_emdash/api/setup/dev-bypass?redirect=/blog` once. That development-only route creates a local admin and imports the seeded posts. The admin user is `dev@emdash.local`.

`npm run seed:blog` rewrites `seed/seed.json` from the markdown archive and copies any missing hero images into `public/assets`.

## Deploy

```bash
npx emdash secrets generate
npx wrangler secret put EMDASH_ENCRYPTION_KEY
npm run deploy
```

The first request creates the D1 database schema from `seed/seed.json`. Finish setup at `/_emdash/admin` on the production domain and choose the sample content so the imported posts are created. Later deploys leave existing content alone.
