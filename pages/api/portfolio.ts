/* Authenticate users with email and password 
before opening the portfolio file */

import type { NextApiRequest, NextApiResponse } from "next";

type Data =
  | {
      redirectUrl: string;
    }
  | { error: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const basicAuth = req.headers.authorization;

  if (basicAuth) {
    const authValue = basicAuth.split(" ")[1];
    const [user, pwd] = atob(authValue).split(":");

    if (pwd === process.env.PORTFOLIO_PASSWORD) {
      return res.status(200).json({ redirectUrl: process.env.PORTFOLIO_URL });
    }

    return res.status(401).json({ error: "Wrong password!" });
  }

  return res.status(400).json({ error: "Please enter a password." });
}
