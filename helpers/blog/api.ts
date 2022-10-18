import { contentfulClient, CONTENT_TYPE } from "lib/contentful/client";
import type { BlogPost, BlogPostResponse } from "infrastructure/blog/types";
import type { Entry, EntryCollection } from "contentful";

export async function fetchEntry(slug: string): Promise<BlogPostResponse> {
  const res = await contentfulClient.getEntries({
    content_type: CONTENT_TYPE.BLOG_POST,
    "fields.slug[in]": slug,
  });

  return res.items[0] as BlogPostResponse;
}

export async function fetchRelatedEntries(slug: string): Promise<{
  previous: BlogPostResponse | null;
  next: BlogPostResponse | null;
}> {
  const currentItemRes = await contentfulClient.getEntries({
    content_type: CONTENT_TYPE.BLOG_POST,
    "fields.slug[in]": slug,
  });

  const { items } = currentItemRes as EntryCollection<BlogPost>;
  const currentPostDate = items[0]?.fields?.date;

  const previousPostRes = await contentfulClient.getEntries({
    order: "-fields.date",
    content_type: CONTENT_TYPE.BLOG_POST,
    limit: 1,
    "fields.date[lt]": currentPostDate,
  });

  const nextPostRes = await contentfulClient.getEntries({
    order: "fields.date",
    content_type: CONTENT_TYPE.BLOG_POST,
    limit: 1,
    "fields.date[gt]": currentPostDate,
  });

  return {
    previous: previousPostRes.items.length
      ? (previousPostRes.items[0] as BlogPostResponse)
      : null,
    next: nextPostRes.items.length
      ? (nextPostRes.items[0] as BlogPostResponse)
      : null,
  };
}

export async function fetchEntries(
  entryType?: "blogPost" | "changelog"
): Promise<BlogPostResponse[]> {
  const res = await contentfulClient.getEntries({
    order: "-fields.date",
    content_type: entryType || CONTENT_TYPE.BLOG_POST,
  });

  return res.items as BlogPostResponse[];
}

export async function fetchLastEntry(): Promise<BlogPostResponse> {
  const res = await contentfulClient.getEntries({
    order: "-fields.date",
    content_type: CONTENT_TYPE.BLOG_POST,
    limit: 2,
  });

  return res.items[0] as BlogPostResponse;
}
