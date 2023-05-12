import { supabaseClient } from "lib/supabase/client";
import type { NextApiRequest, NextApiResponse } from "next";

// Note: we don’t need to use try/catch with await supabaseClient
// https://github.com/supabase/supabase-js/issues/32#issuecomment-1061383837

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

  const { data, error: getRowError } = await supabaseClient
    .from("posts")
    .select()
    .eq("id", id)
    .limit(1);

  if (getRowError) {
    const { error: createRowError } = await supabaseClient
      .from("posts")
      .insert({ id: postId, likes: 0 });

    if (createRowError) {
      return res.status(500).json({
        message: `An error occurred while adding a row for post ${postId} in the likes table. PostGRES error: ${createRowError.message}`,
      });
    } else {
      return res.status(500).json({
        message: `An error occurred while getting likes for post ${postId}. PostGRES error: ${getRowError.message}`,
      });
    }
  }

  let likes = 0;

  if (data && data[0]?.likes) {
    likes = data[0].likes;
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

    if (error) {
      return res.status(500).json({
        message: `An error occurred while updating likes for post ${postId}. PostGRES error: ${error.message}`,
      });
    }

    res.status(200).json({ likes: updatedLikes });
  }
}
