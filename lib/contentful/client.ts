import { createClient } from "contentful";

export const CONTENT_TYPE = {
  BLOG_POST: "blogPost",
  CHANGELOG: "changelog",
};

export const contentfulClient = createClient({
  space: process.env.CF_SPACE as string,
  accessToken: process.env.CF_PUBLISHED_CONTENT_ACCESS_TOKEN as string,
  // host: "preview.contentful.com",
});
