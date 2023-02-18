import fs from "fs";
import path from "path";

import type { ArticleMetaData } from "components/entries/ArticleWrapper/types";
import type { NextApiRequest, NextApiResponse } from "next";

type RelatedPost = ArticleMetaData | null;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    { previousPost: RelatedPost; nextPost: RelatedPost } | { message: string }
  >
) {
  const { id } = req.query;

  if (Array.isArray(id)) {
    return res.status(400).json({ message: "ID can only be set once" });
  }

  const postSlugs = fs.readdirSync(
    path.join(process.cwd(), "pages", "snippets"),
    {
      withFileTypes: true,
    }
  );

  const allPosts: ArticleMetaData[] = await Promise.all(
    postSlugs.map(async (file) => {
      if (!file.name.endsWith(".mdx")) return;

      const slug = file.name.replace(/.mdx$/, "");
      const metadata = await import(`pages/snippets/${slug}.mdx`);

      return { ...metadata.meta, slug, category: "snippets" };
    })
  );

  const publishedPosts = allPosts.filter((post) => post?.isPublished);
  const orderedPosts = publishedPosts.sort((a, b) => {
    return b.date.valueOf() - a.date.valueOf();
  });

  const totalPosts = orderedPosts.length;
  const currentPostIndex = orderedPosts.findIndex((post) => post.id === id);
  const nextPost =
    currentPostIndex < totalPosts - 1
      ? orderedPosts[currentPostIndex + 1]
      : null;
  const previousPost =
    currentPostIndex > 0 ? orderedPosts[currentPostIndex - 1] : null;

  res.status(200).json({
    previousPost,
    nextPost,
  });
}
