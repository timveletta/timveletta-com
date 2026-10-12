import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
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

const til = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/til" }),
  schema: z.object({
    title: z.string(),
    updatedAt: z.coerce.date(),
    draft: z.boolean().optional(),
    category: z.string(),
  }),
});

export const collections = { projects, til };
