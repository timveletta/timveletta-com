import { getEmDashCollection, getEmDashEntry, getTermsForEntries } from "emdash";

export async function loadPosts(limit?: number) {
  const { entries, error, cacheHint } = await getEmDashCollection("posts", {
    orderBy: { published_on: "desc" },
    ...(limit ? { limit } : {}),
  });
  if (error) throw error;

  const tagsByEntry = await getTermsForEntries(
    "posts",
    entries.map((post) => post.data.id),
    "tag",
  );

  return { entries, cacheHint, tagsByEntry };
}

export async function loadPost(slug: string) {
  const { entry, error, cacheHint } = await getEmDashEntry("posts", slug);
  if (error) throw error;
  return { entry, cacheHint };
}

export function publishedOn(value: Date | string | null | undefined) {
  if (!value) return null;
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date;
}

export function mediaSrc(image: unknown) {
  if (!image || typeof image !== "object") return undefined;
  const src = (image as { src?: unknown }).src;
  return typeof src === "string" && src ? src : undefined;
}
