import type { BlogPostResponse } from "infrastructure/blog/types";

type BlogPostFilters = {
  entries: BlogPostResponse[];
  category?: string | null;
  subcategory?: string | null;
  tag?: string | null;
};

export default function filterPosts({
  entries,
  category,
  subcategory,
  tag,
}: BlogPostFilters): BlogPostResponse[] | null {
  const getEntries = () => {
    const shouldFilterByCategory = !!category;
    const shouldFilterBySubCategory = !!subcategory;
    const shouldFilterByTag = !!tag;

    const filteredPostsByCategory = shouldFilterByCategory
      ? entries.filter(
          (post: BlogPostResponse) => post.fields.category === category
        )
      : entries;

    const filteredPostsBySubCategory = shouldFilterBySubCategory
      ? filteredPostsByCategory?.filter(
          (post: BlogPostResponse) => post.fields.subcategory === subcategory
        )
      : filteredPostsByCategory;

    const filteredPostsByTag = shouldFilterByTag
      ? filteredPostsBySubCategory?.filter((post: BlogPostResponse) =>
          post.fields.tags?.includes(tag)
        )
      : filteredPostsBySubCategory;

    return filteredPostsByTag;
  };

  return getEntries();
}
