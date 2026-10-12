import { mkdir, copyFile, readdir, readFile, writeFile, constants as fsConstants } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { markdownToPortableText } from "emdash/client";
import yaml from "yaml";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const blogDir = path.join(root, "src/content/blog");
const assetDir = path.join(blogDir, "assets");
const publicAssets = path.join(root, "public/assets");

function rewriteAssetUrl(url) {
  const trimmed = url.trim();
  const relative = trimmed.match(/^\.\/assets\/(.+)$/);
  if (relative) return `/assets/${relative[1]}`;
  return trimmed;
}

function normalizeMarkdown(markdown) {
  const withHtmlImages = markdown.replace(/<img\b[^>]*>/gi, (tag) => {
    const src = tag.match(/\bsrc=["']([^"']+)["']/i)?.[1];
    if (!src) return tag;
    const alt = tag.match(/\balt=["']([^"']*)["']/i)?.[1] ?? "";
    return `\n![${alt}](${rewriteAssetUrl(src)})\n`;
  });

  return withHtmlImages
    .split("\n")
    .map((line) => {
      const match = line.match(/^(\s*)!\[([^\]]*)\]\(([^)]+)\)\s*$/);
      if (!match) return line;
      const url = match[3].replace(/\s+"[^"]*"\s*$/, "");
      return `${match[1]}![${match[2]}](${rewriteAssetUrl(url)})`;
    })
    .join("\n");
}

function mediaValue(filename, alt) {
  return {
    id: `asset:${filename}`,
    provider: "external",
    src: `/assets/${filename}`,
    alt,
  };
}

const files = (await readdir(blogDir)).filter((name) => name.endsWith(".md")).sort();
const posts = [];
const tags = new Map();

await mkdir(publicAssets, { recursive: true });
for (const asset of await readdir(assetDir)) {
  const sourceImage = path.join(assetDir, asset);
  const publicImage = path.join(publicAssets, asset);
  try {
    await copyFile(sourceImage, publicImage, fsConstants.COPYFILE_EXCL);
  } catch (error) {
    if (error?.code !== "EEXIST") throw error;
  }
}

for (const file of files) {
  const raw = await readFile(path.join(blogDir, file), "utf8");
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) throw new Error(`Missing frontmatter in ${file}`);
  const data = yaml.parse(match[1]);
  const slug = file.replace(/\.md$/, "");
  const heroName = String(data.heroImage ?? "").replace(/^\.\/assets\//, "");
  if (!heroName) throw new Error(`Missing hero image in ${file}`);
  await readFile(path.join(assetDir, heroName));

  const postTags = Array.isArray(data.tags) ? data.tags.map(String) : [];
  for (const tag of postTags) {
    if (!tags.has(tag)) tags.set(tag, tag);
  }

  const publishedOn = new Date(data.pubDate).toISOString();
  posts.push({
    id: `post-${slug.toLowerCase()}`,
    slug,
    status: data.draft ? "draft" : "published",
    data: {
      title: data.title,
      description: data.description,
      published_on: publishedOn,
      featured_image: mediaValue(heroName, `Hero image for post ${data.title}`),
      image_credit_name: data.imageCreditName,
      image_credit_url: data.imageCreditLink,
      ...(data.prevUrl ? { prev_url: data.prevUrl } : {}),
      content: markdownToPortableText(normalizeMarkdown(match[2])),
    },
    taxonomies: {
      tag: postTags,
    },
  });
}

const seed = {
  $schema: "https://emdashcms.com/seed.schema.json",
  version: "1",
  defaultLocale: "en",
  meta: {
    name: "Tim Veletta",
    description: "Blog posts imported from the Astro content collection.",
    author: "Tim Veletta",
  },
  settings: {
    title: "Tim Veletta",
    tagline: "The personal portfolio and blog of me, Tim Veletta.",
    url: "https://timveletta.com",
    timezone: "Australia/Perth",
    dateFormat: "MMMM d, yyyy",
  },
  collections: [
    {
      slug: "posts",
      label: "Posts",
      labelSingular: "Post",
      description: "Blog posts",
      icon: "article",
      supports: ["drafts", "revisions", "preview", "scheduling", "search", "seo"],
      urlPattern: "/blog/{slug}",
      titleField: "title",
      dateField: "published_on",
      admin: { listColumns: ["published_on"] },
      fields: [
        { slug: "title", label: "Title", type: "string", required: true, searchable: true },
        { slug: "description", label: "Description", type: "text", required: true, searchable: true },
        {
          slug: "published_on",
          label: "Published on",
          type: "datetime",
          required: true,
          indexed: true,
        },
        { slug: "featured_image", label: "Featured image", type: "image", required: true },
        { slug: "image_credit_name", label: "Image credit name", type: "string", required: true },
        { slug: "image_credit_url", label: "Image credit URL", type: "url", required: true },
        { slug: "prev_url", label: "Previous URL", type: "url" },
        { slug: "content", label: "Content", type: "portableText", searchable: true },
      ],
    },
  ],
  taxonomies: [
    {
      name: "tag",
      label: "Tags",
      labelSingular: "Tag",
      hierarchical: false,
      collections: ["posts"],
      terms: [...tags.keys()].sort().map((tag) => ({ slug: tag, label: tag })),
    },
  ],
  content: { posts },
};

const seedDir = path.join(root, "seed");
await mkdir(seedDir, { recursive: true });
await writeFile(path.join(seedDir, "seed.json"), `${JSON.stringify(seed, null, 2)}\n`);
console.log(`Wrote ${posts.length} posts and ${tags.size} tags to seed/seed.json`);
