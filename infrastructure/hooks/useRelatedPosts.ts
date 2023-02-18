import { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchRelatedPosts,
  selectRelatedPosts,
  selectRelatedPostsStatus,
} from "lib/redux/relatedPostsSlice";
import type { RelatedPosts } from "pages/api/snippets/[id]/related";
import type { AppDispatch } from "lib/redux/store";

export default function useRelatedPosts(postId: number): RelatedPosts {
  const dispatch = useDispatch<AppDispatch>();

  const relatedPosts = useSelector(selectRelatedPosts);
  const relatedPostsStatus = useSelector(selectRelatedPostsStatus);
  const relatedPostsForCurrentPost = relatedPosts[postId];

  const getRelatedPosts = useCallback(() => {
    dispatch(fetchRelatedPosts(postId));
  }, [dispatch, postId]);

  useEffect(() => {
    if (!relatedPostsForCurrentPost) {
      getRelatedPosts();
    }
  }, [getRelatedPosts, postId, relatedPostsForCurrentPost]);

  return {
    previousPost: relatedPostsForCurrentPost?.previousPost,
    nextPost: relatedPostsForCurrentPost?.nextPost,
  };
}
