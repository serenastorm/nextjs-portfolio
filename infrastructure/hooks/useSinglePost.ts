import { useEffect, useState } from "react";
import { BlogPostResponse } from "infrastructure/blog/types";
import { apiUrl } from "infrastructure/routes/constants";

type Post = {
  post: BlogPostResponse | null;
  isLoading: boolean;
  isEmpty: boolean;
  likes: {
    total: number;
    add: () => void;
    remove: () => void;
  };
};

export default function useSinglePost(category: string, slug: string): Post {
  const [post, setPost] = useState<BlogPostResponse | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [currentLikes, setCurrentLikes] = useState<number>(0);
  const [isEmpty, setIsEmpty] = useState<boolean>(true);

  useEffect(() => {
    fetch(`${apiUrl}/snippet/${category}/${slug}`)
      .then((res) => res.json())
      .then((blogPosts: BlogPostResponse[]) => {
        setPost(blogPosts[0]);
        setLoading(false);
        setIsEmpty(blogPosts.length === 0);
      })
      .catch(() => {
        setLoading(false);
        setIsEmpty(true);
      });
  }, [category, slug]);

  useEffect(() => {
    if (post?.sys.id) {
      fetch(`${apiUrl}/snippetDoc/${post.sys.id}/likes`)
        .then((res) => res.json())
        .then((doc: { likes: number }) => {
          setCurrentLikes(doc.likes);
        })
        .catch((error) => console.log(error));
    }
  }, [post]);

  const likes = {
    total: currentLikes > 0 ? currentLikes : 0,
    add: () =>
      post?.sys.id
        ? fetch(`${apiUrl}/snippetDoc/${post.sys.id}/likes/add`, {
            method: "POST",
          })
            .then((res) => res.json())
            .then((doc) => setCurrentLikes(doc.likes))
        : {},
    remove: () =>
      post?.sys.id
        ? fetch(`${apiUrl}/snippetDoc/${post.sys.id}/likes/remove`, {
            method: "POST",
          })
            .then((res) => res.json())
            .then((doc) => setCurrentLikes(doc.likes))
        : {},
  };

  return { post, isLoading, isEmpty, likes };
}
