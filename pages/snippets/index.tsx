import { useRouter } from "next/router";
import Head from "next/head";
import { SnippetLink } from "components/snippets";
import { Page } from "components/shared/Page";
import { usePosts } from "infrastructure/hooks";
import { getCategory } from "helpers/blog/constants";

import blogStyles from "styles/blog/Blog.module.scss";
import blogIndexStyles from "styles/blog/BlogIndex.module.scss";
import blogPageStyles from "styles/blog/BlogPage.module.scss";

const BlogCategoryPage = () => {
  const { query } = useRouter();

  const { cat, tag: queryTag } = query;

  const category = "snippets";
  const subcategory = Array.isArray(cat) ? cat[0] : cat || "";
  const tag = Array.isArray(queryTag) ? queryTag[0] : queryTag || "";

  const { posts, isLoading, isEmpty } = usePosts({
    category,
    subcategory,
    tag: tag ? getCategory(tag).value : null,
  });

  const tagSubtitle = tag && getCategory(tag).label;
  const subcategorySubtitle = subcategory && getCategory(subcategory).label;
  const subtitle = tagSubtitle || subcategorySubtitle;

  return (
    <>
      <Head>
        <title>{subtitle ? `${subtitle} | ` : ""}Snippets</title>
      </Head>
      <Page
        className={`${blogPageStyles.blogPage} ${blogStyles.blog} ${blogIndexStyles.blogIndex}`}
      >
        <h1 className={blogIndexStyles.blogIndexTitle}>
          {tag || subcategory ? (
            <>
              Snippets {tag ? "tagged" : "in"}:{" "}
              <span className="italic medium">
                {(tag && getCategory(tag).label) ||
                  (subcategory && getCategory(subcategory).label)}
              </span>
            </>
          ) : (
            "All snippets"
          )}
        </h1>
        <ul className={blogIndexStyles.blogPosts}>
          <SnippetLink
            posts={posts}
            isLoading={isLoading}
            isEmpty={isEmpty}
          />
        </ul>
      </Page>
    </>
  );
};

export default BlogCategoryPage;
