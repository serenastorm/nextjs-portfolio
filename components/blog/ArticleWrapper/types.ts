export type ArticleMetaData = {
  id: number;
  title: string;
  category: "snippets";
  subcategory?: string;
  slug: string;
  tags?: string[];
  date: Date;
  shortText?: string;
  isPublished?: boolean;
};
