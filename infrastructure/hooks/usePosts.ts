import { useEffect, useState } from "react";
import { BlogPostResponse, BlogPosts } from "infrastructure/blog/types";
import { apiUrl } from "infrastructure/routes/constants";

type BlogPostFilters = {
  category?: string | null;
  subcategory?: string | null;
  tag?: string | null;
};

export default function usePosts({
  category,
  subcategory,
  tag,
}: BlogPostFilters): BlogPosts {
  const [posts, setPosts] = useState<BlogPostResponse[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [isEmpty, setIsEmpty] = useState<boolean>(true);

  useEffect(() => {
    fetch(`${apiUrl}/${category}/all`)
      .then((res) => res.json())
      .then((blogPosts: BlogPostResponse[]) => {
        const shouldFilterByCategory = !!category;
        const shouldFilterBySubCategory = !!subcategory;
        const shouldFilterByTag = !!tag;

        const filteredPostsByCategory = shouldFilterByCategory
          ? blogPosts.filter(
              (post: BlogPostResponse) => post.fields.category === category
            )
          : blogPosts;

        const filteredPostsBySubCategory = shouldFilterBySubCategory
          ? filteredPostsByCategory?.filter(
              (post: BlogPostResponse) =>
                post.fields.subcategory === subcategory
            )
          : filteredPostsByCategory;

        const filteredPostsByTag = shouldFilterByTag
          ? filteredPostsBySubCategory?.filter((post: BlogPostResponse) =>
              post.fields.tags?.includes(tag)
            )
          : filteredPostsBySubCategory;

        setPosts(filteredPostsByTag);
        setLoading(false);
        setIsEmpty(filteredPostsByTag.length === 0);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [category, subcategory, tag]);

  return { posts, isLoading, isEmpty };
}
