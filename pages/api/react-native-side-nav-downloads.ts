import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ downloads: number } | { message: string }>
) {
  const endDate = new Date().toISOString().split("T")[0];
  const response = await fetch(
    `https://api.npmjs.org/downloads/point/2020-03-29:${endDate}/react-native-side-nav`
  );

  const data = await response.json();

  if (data.error) {
    res.status(500).json({ message: data.error });
  }

  res.status(200).json({ downloads: data.downloads });
}
