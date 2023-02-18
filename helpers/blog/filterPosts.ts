import type { ArticleMetaData } from "components/entries/ArticleWrapper/types";

type BlogPostFilters = {
  entries: ArticleMetaData[];
  category?: string | null;
  subcategory?: string | null;
  tag?: string | null;
};

export const filterPosts = ({
  entries,
  category,
  subcategory,
  tag,
}: BlogPostFilters): ArticleMetaData[] | null => {
  const getEntries = () => {
    const shouldFilterByCategory = !!category;
    const shouldFilterBySubCategory = !!subcategory;
    const shouldFilterByTag = !!tag;

    const filteredPostsByCategory = shouldFilterByCategory
      ? entries.filter((post: ArticleMetaData) => post.category === category)
      : entries;

    const filteredPostsBySubCategory = shouldFilterBySubCategory
      ? filteredPostsByCategory?.filter(
          (post: ArticleMetaData) => post.subcategory === subcategory
        )
      : filteredPostsByCategory;

    const filteredPostsByTag = shouldFilterByTag
      ? filteredPostsBySubCategory?.filter((post: ArticleMetaData) =>
          post.tags?.includes(tag)
        )
      : filteredPostsBySubCategory;

    return filteredPostsByTag;
  };

  return getEntries();
};
