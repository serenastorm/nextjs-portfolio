import { useEffect, useState } from "react";
import { apiUrl } from "infrastructure/routes/constants";

type Likes = {
  totalLikes: number;
  addLike: () => void;
  removeLike: () => void;
  likesAreLoading: boolean;
};

export default function useLikes(postId: string): Likes {
  const [totalLikes, setTotalLikes] = useState<number>(0);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(`${apiUrl}/snippetDoc/${postId}/likes`)
      .then((res) => res.json())
      .then((doc: { likes: number }) => {
        setTotalLikes(doc.likes);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [postId]);

  const addLike = () =>
    fetch(`${apiUrl}/snippetDoc/${postId}/likes/add`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((doc) => setTotalLikes(doc.likes));

  const removeLike = () =>
    fetch(`${apiUrl}/snippetDoc/${postId}/likes/remove`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((doc) => setTotalLikes(doc.likes));

  return {
    totalLikes: totalLikes > 0 ? totalLikes : 0,
    likesAreLoading: isLoading,
    addLike,
    removeLike,
  };
}
