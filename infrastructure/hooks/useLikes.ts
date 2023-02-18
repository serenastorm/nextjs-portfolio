import { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchLikes,
  updateLikes,
  selectLikes,
  selectLikesStatus,
} from "lib/redux/likesSlice";
import type { AppDispatch } from "lib/redux/store";

type Likes = {
  totalLikes: number;
  addLike: () => void;
  removeLike: () => void;
  likesStatus: "initial" | "loading" | "failed" | "succeeded";
};

export default function useLikes(postId: number): Likes {
  const dispatch = useDispatch<AppDispatch>();

  const likes = useSelector(selectLikes);
  const likesStatus = useSelector(selectLikesStatus);
  const likesForPost = likes[postId];

  const getLikesForPost = useCallback(() => {
    dispatch(fetchLikes(postId));
  }, [dispatch, postId]);

  useEffect(() => {
    if (!likesForPost) {
      getLikesForPost();
    }
  }, [getLikesForPost, postId, likesForPost]);

  const addLike = () =>
    dispatch(
      updateLikes({
        postId,
        action: "add",
      })
    );

  const removeLike = () =>
    dispatch(
      updateLikes({
        postId,
        action: "remove",
      })
    );

  return {
    totalLikes: likes[postId],
    likesStatus,
    addLike,
    removeLike,
  };
}
