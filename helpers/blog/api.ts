// TODO error handling
import fs from "fs";
import { join } from "path";
import type { BlogPostResponse } from "infrastructure/blog/types";
import type { ArticleMetaData } from "components/blog/ArticleWrapper/types";

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
  const fileNames = fs
    .readdirSync(join(process.cwd(), "pages", "snippets"), {
      withFileTypes: true,
    })
    .map((file) => file.name);

  const allPosts: ArticleMetaData[] = await Promise.all(
    fileNames.map(async (fileName) => {
      if (!fileName.endsWith(".mdx")) return;

      const slug = fileName.replace(/.mdx$/, "");
      const { meta } = await import(`pages/snippets/${slug}.mdx`);

      return { ...meta, slug, category: "snippets" };
    })
  );

  const publishedPosts = allPosts.filter((post) => post?.isPublished);

  const orderedPosts = publishedPosts.sort((a, b) => {
    return b.date.valueOf() - a.date.valueOf();
  });

  const posts = limit ? orderedPosts.slice(0, limit) : orderedPosts;
  return JSON.parse(JSON.stringify(posts));
}
