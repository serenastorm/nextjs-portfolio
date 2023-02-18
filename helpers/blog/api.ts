// TODO add errors
import { contentfulClient, CONTENT_TYPE } from "lib/contentful/client";
import type { BlogPost, BlogPostResponse } from "infrastructure/blog/types";
import type { EntryCollection } from "contentful";
import type { ArticleMetaData } from "components/entries/ArticleWrapper/types";

export async function fetchEntry(slug: string): Promise<BlogPostResponse> {
  const res = await contentfulClient.getEntries({
    content_type: CONTENT_TYPE.BLOG_POST,
    "fields.slug[in]": slug,
  });

  return res.items[0] as BlogPostResponse;
}

export async function fetchRelatedEntries(id: string): Promise<{
  previousPost: BlogPostResponse | null;
  nextPost: BlogPostResponse | null;
}> {
  const res = await fetch(`${process.env.APP_URL}/api/snippets/${id}/related`, {
    method: "GET",
  });

  if (!res.ok) {
    // const message = `An error has occurred while fetching likes for post ${postId}: ${likesRes.status}`;
    // throw new Error(message);
  }

  const { previousPost, nextPost } = await res.json();

  return { previousPost, nextPost };
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

export async function fetchMarkdownEntries(
  limit?: number
): Promise<ArticleMetaData[]> {
  const res = await fetch(
    `${process.env.APP_URL}/api/snippets${limit ? `?limit=${limit}` : ""}`,
    {
      method: "GET",
    }
  );

  if (!res.ok) {
    // const message = `An error has occurred while fetching likes for post ${postId}: ${likesRes.status}`;
    // throw new Error(message);
  }

  const { posts } = await res.json();

  return posts;
}
