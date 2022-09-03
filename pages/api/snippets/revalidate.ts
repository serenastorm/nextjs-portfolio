import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ validated: boolean } | { message: string }>
) {
  if (process.env.CF_BLOG_WEBHOOK_SECRET !== req.headers["webhook_secret"]) {
    return res.status(401).json({ message: "Invalid secret" });
  }

  try {
    const slug = JSON.parse(req.body)?.parameters?.slug?.["en-US"];

    if (slug) {
      await res.revalidate(`/snippets/${slug}`);
    }

    await res.revalidate("/snippets");
    await res.revalidate("/");
    return res.json({ validated: true });
  } catch (err) {
    res.status(500).json({ message: "Error revalidating" });
  }
}
