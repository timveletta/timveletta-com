import { z, defineCollection } from 'astro:content';

const blogCollection = defineCollection({
	schema: z.object({
		title: z.string(),
		pubDate: z.date(),
		description: z.string(),
		tags: z.array(z.string()),
		heroImage: z.string(),
		imageCreditName: z.string(),
		imageCreditLink: z.string(),
		prevUrl: z.string().optional(),
	}),
});

export const collections = {
	blog: blogCollection,
};
