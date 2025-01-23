import { z, defineCollection } from "astro:content";

const blogCollection = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      pubDate: z.date(),
      draft: z.boolean().optional(),
      description: z.string(),
      tags: z.array(z.string()).optional(),
      heroImage: image(),
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

const tilCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    updatedAt: z.date(),
    draft: z.boolean().optional(),
    category: z.string(),
  }),
});

export const collections = {
  blog: blogCollection,
  projects: projectCollection,
  til: tilCollection,
};
