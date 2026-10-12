import type { APIRoute } from "astro";
import { getEmDashCollection } from "emdash";
import { SITE_DESCRIPTION, SITE_TITLE } from "../config";
import { publishedOn } from "../lib/blog";

export const GET: APIRoute = async ({ site, url }) => {
  const siteUrl = site ?? new URL(url.origin);
  const { entries, error } = await getEmDashCollection("posts", {
    orderBy: { published_on: "desc" },
    limit: 20,
  });
  if (error) return new Response("Unable to load posts", { status: 500 });

  const items = entries
    .map((post) => {
      const date = publishedOn(post.data.published_on);
      if (!date) return null;
      const postUrl = new URL(`/blog/${post.id}`, siteUrl).href;
      return `    <item>
      <title>${escapeXml(post.data.title || "Untitled")}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${date.toUTCString()}</pubDate>
      <description>${escapeXml(post.data.description || "")}</description>
    </item>`;
    })
    .filter(Boolean)
    .join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <link>${siteUrl.href}</link>
    <atom:link href="${new URL("/rss.xml", siteUrl).href}" rel="self" type="application/rss+xml"/>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};

function escapeXml(str: string): string {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}
