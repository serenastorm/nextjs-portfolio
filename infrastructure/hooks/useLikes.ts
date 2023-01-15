import { useEffect, useState } from "react";

type Likes = {
  totalLikes: number;
  addLike: () => void;
  removeLike: () => void;
  likesAreLoading: boolean;
};

export default function useLikes(postId: string): Likes {
  const [totalLikes, setTotalLikes] = useState<number>(0);
  const [isLoading, setLoading] = useState<boolean>(true);
  const apiEndpoint = `/api/snippet/${postId}/likes`;

  useEffect(() => {
    const getLikes = async () => {
      const likesRes = await fetch(apiEndpoint, {
        method: "GET",
      });

      if (!likesRes.ok) {
        const message = `An error has occurred while fetching likes for post ${postId}: ${likesRes.status}`;
        throw new Error(message);
      }

      const { likes } = await likesRes.json();
      setTotalLikes(likes);
      setLoading(false);
    };

    getLikes();
  }, [postId]);

  const addLike = async () => {
    const likesRes = await fetch(apiEndpoint, {
      method: "POST",
      body: JSON.stringify({
        action: "add",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!likesRes.ok) {
      const message = `An error has occurred while adding a like to post ${postId}: ${likesRes.status}`;
      throw new Error(message);
    }

    const { likes } = await likesRes.json();
    setTotalLikes(likes);
    setLoading(false);
  };

  const removeLike = async () => {
    const likesRes = await fetch(apiEndpoint, {
      method: "POST",
      body: JSON.stringify({
        action: "remove",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!likesRes.ok) {
      const message = `An error has occurred while removing a like for post ${postId}: ${likesRes.status}`;
      throw new Error(message);
    }

    const { likes } = await likesRes.json();
    setTotalLikes(likes);
    setLoading(false);
  };

  return {
    totalLikes: totalLikes > 0 ? totalLikes : 0,
    likesAreLoading: isLoading,
    addLike,
    removeLike,
  };
}
