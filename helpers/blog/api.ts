// TODO error handling
import type { BlogPostResponse } from "infrastructure/blog/types";
import type { ArticleMetaData } from "components/entries/ArticleWrapper/types";

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
