import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
import vercel from '@astrojs/vercel/static';

// https://astro.build/config
import image from '@astrojs/image';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
	site: 'https://timveletta.com',
	integrations: [
		react(),
		mdx(),
		sitemap(),
		tailwind(),
		image({ serviceEntryPoint: '@astrojs/image/sharp' }),
	],
	output: 'static',
	adapter: vercel(),
});
