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

const projectCollection = defineCollection({
	schema: z.object({
		title: z.string(),
		description: z.string(),
		heroImage: z.string(),
		tags: z.array(z.string()),
		githubLink: z.string().optional(),
		websiteLink: z.string().optional(),
		featured: z.boolean().optional(),
	}),
});

export const collections = {
	blog: blogCollection,
	projects: projectCollection,
};
