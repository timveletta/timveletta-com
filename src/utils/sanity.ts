import { sanityClient } from "sanity:client";
import type { PortableTextBlock } from "@portabletext/types";
import type { ImageAsset, Slug, DateComponents } from "@sanity/types";
import groq from "groq";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const imageBuilder = imageUrlBuilder(sanityClient);

export function urlForImage(source: SanityImageSource) {
  return imageBuilder.image(source);
}

export async function getPosts(): Promise<Post[]> {
  return await sanityClient.fetch(
    groq`*[_type == "blog-post" && defined(slug.current)] | order(pubDate desc)`
  );
}

export async function getPost(slug: string): Promise<Post> {
  return await sanityClient.fetch(
    groq`*[_type == "blog-post" && slug.current == $slug][0]`,
    {
      slug,
    }
  );
}

export interface Post {
  _type: "blog-post";
  _createdAt: string;
  title: string;
  slug: Slug;
  description: string;
  pubDate: string;
  heroImage: {
    image: ImageAsset;
    link?: string;
    name?: string;
  };
  tags: string[];
  content: PortableTextBlock[];
}
