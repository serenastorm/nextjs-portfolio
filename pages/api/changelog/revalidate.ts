import { routes } from "infrastructure/routes/constants";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ validated: boolean } | { message: string }>
) {
  if (
    process.env.CF_CHANGELOG_WEBHOOK_SECRET !== req.headers["webhook_secret"]
  ) {
    return res.status(401).json({ message: "Invalid secret" });
  }

  try {
    await res.revalidate(routes.changelog);
    return res.json({ validated: true });
  } catch (err) {
    res.status(500).json({ message: "Error revalidating" });
  }
}
