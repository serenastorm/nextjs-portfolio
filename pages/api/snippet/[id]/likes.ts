import { fireStoreAdmin, firestoreDb } from "lib/firebase/serviceAccount";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ likes: number } | { message: string }>
) {
  const { id } = req.query;

  const articleDoc = await firestoreDb
    .collection("articles")
    .doc(`${id}`)
    .get();

  let likes = 0;

  if (articleDoc.exists && articleDoc.data()?.likes) {
    likes = articleDoc.data()?.likes;
  } else {
    // Initialise document if it does't exist
    const newDoc = { likes };
    await firestoreDb.collection("articles").doc(`${id}`).set(newDoc);
  }

  if (req.method === "GET") {
    res.status(200).json({ likes });
  } else if (req.method === "POST") {
    const { action } = req.body;

    if (action === "remove") {
      const updatedLikes = likes > 0 ? likes - 1 : likes;

      await firestoreDb
        .collection("articles")
        .doc(`${id}`)
        .update({
          likes: fireStoreAdmin.FieldValue.increment(-1),
        });

      res.status(200).json({ likes: updatedLikes });
    } else if (action === "add") {
      await firestoreDb
        .collection("articles")
        .doc(`${id}`)
        .update({
          likes: fireStoreAdmin.FieldValue.increment(1),
        });

      res.status(200).json({ likes: likes + 1 });
    }
  }
}
