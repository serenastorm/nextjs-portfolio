import fs from "fs";
import path from "path";

import type { ArticleMetaData } from "components/entries/ArticleWrapper/types";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ posts: ArticleMetaData[] } | { message: string }>
) {
  const { limit } = req.query;

  if (Array.isArray(limit)) {
    return res.status(400).json({ message: "Limit can only be set once" });
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

  res.status(200).json({
    posts: limit ? orderedPosts.slice(0, parseInt(limit)) : orderedPosts,
  });
}
