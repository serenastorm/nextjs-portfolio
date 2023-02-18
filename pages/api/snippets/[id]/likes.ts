import { supabaseClient } from "lib/supabase/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ likes: number } | { message: string }>
) {
  const { id } = req.query;

  if (Array.isArray(id)) {
    return res.status(400).json({ message: "ID can only be set once" });
  }

  if (!id) {
    return res.status(400).json({ message: "Post ID missing" });
  }

  const postId = parseInt(id);

  const { data, error } = await supabaseClient
    .from("posts")
    .select()
    .eq("id", id)
    .limit(1);

  if (error) {
    // TODO error handling
  }

  let likes = 0;

  if (data && data[0].likes) {
    likes = data[0].likes;
  } else {
    const { error } = await supabaseClient
      .from("posts")
      .insert({ id: postId, likes: 0 });

    if (error) {
      // TODO error handling
    }
  }

  if (req.method === "GET") {
    res.status(200).json({ likes });
  } else if (req.method === "POST") {
    const { action } = req.body;

    const decrementLikes = likes > 0 ? likes - 1 : likes;
    const incrementLikes = likes + 1;
    const updatedLikes = action === "remove" ? decrementLikes : incrementLikes;

    const { error } = await supabaseClient.rpc("update_likes", {
      row_id: postId,
      increment_amount: action === "remove" ? -1 : 1,
    });

    // const { error } = await supabaseClient
    //   .from("posts")
    //   .update({ likes: updatedLikes })
    //   .eq("id", postId);

    if (error) {
      // TODO error handling
    }

    res.status(200).json({ likes: updatedLikes });
  }
}
