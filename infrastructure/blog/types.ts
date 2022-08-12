export type BlogPost = {
  title: string;
  slug: string;
  category: string;
  subcategory: string;
  tags?: string[];
  content: string;
  date: Date;
  topics?: string[];
  shortText?: string;
  sandpackContent?: string;
  sandpackSettings?: any;
};

export type EntryMeta = {
  id: string;
};

export type BlogPostResponse = { fields: BlogPost; sys: EntryMeta };

export type ChangeLog = {
  title: string;
  tags?: string[];
  content?: string;
  date: Date;
};

export type ChangeLogResponse = { fields: BlogPost; sys: EntryMeta };
