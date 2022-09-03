import { routes } from "infrastructure/routes/constants";
import { fetchRelatedEntries } from "helpers/blog/api";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ validated: boolean } | { message: string }>
) {
  if (process.env.CF_BLOG_WEBHOOK_SECRET !== req.headers["webhook_secret"]) {
    return res.status(401).json({ message: "Invalid secret" });
  }
  try {
    const slug = JSON.parse(req.body)?.fields?.slug?.["en-US"];
    if (slug) {
      await res.revalidate(routes.blog.snippet.url(slug));
      const { previous: previousPost, next: nextPost } =
        await fetchRelatedEntries(slug);
      const previousPostSlug = previousPost?.fields?.slug;
      const nextPostSlug = nextPost?.fields?.slug;
      if (previousPostSlug) {
        await res.revalidate(routes.blog.snippet.url(previousPostSlug));
      }
      if (nextPostSlug) {
        await res.revalidate(routes.blog.snippet.url(nextPostSlug));
      }
    }
    await res.revalidate(routes.blog.snippets.url);
    await res.revalidate(routes.home);
    return res.json({ validated: true });
  } catch (err) {
    res.status(500).json({ message: "Error revalidating" });
  }
}
